import React, {useEffect, useState} from 'react'
import { withRouter, useHistory } from 'react-router-dom';
import { 
    ForumPageContainer, 
    HeadingWrapper, 
    SubHeadingWrapper, 
    SubContentWrapper, 
    MessageContainer,
    WidgetThreadLink,
    WidgetLgTable,
    WidgetLgTh,
    WidgetLgTr,
    WidgetLgAmount,
    CategoryCard,
    WidgetLgUser,
    WidgetLgImg,
    WidgetLgDate,
    WidgetLgLink,
    DeleteIcon,
    SortAlphaIcon,
    SortOldNew,
    SortIconWrapper,
} from "../../ForumElements"
import { CourseBasicResp } from '../../../../apis/Entities/Course';
import { ForumCategory } from '../../../../apis/Entities/ForumCategory';
import { ForumThread } from '../../../../apis/Entities/ForumThread';

import { 
    getForumCategoryWithForumThreadsOnlyByForumCategoryId as getForumCategoryByForumCategoryId, 
    getAllForumThreadsByForumCategoryId,
    deleteForumThread, 
} from "../../../../apis/Forum/ForumApis";

import 
{
    getBasicCourseByCourseId
} from "../../../../apis/Course/CourseApis"

import {
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    DialogTitle,
    Dialog,
    IconButton,
    Tooltip,
    Menu,
    MenuItem,
    TextField,
} from '@material-ui/core';

const ForumCategoryView = (props: any) => {
    const courseId = parseInt(props.match.params.courseId);
    const categoryId = parseInt(props.match.params.forumCategoryId);
    const [course, setCourse] = useState<CourseBasicResp>();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [forumCategory, setForumCategory] = useState<ForumCategory>();
    const [forumThreads, setForumThreads] = useState<ForumThread[]>([]);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [anchorElChron, setAnchorElChron] = React.useState<null | HTMLElement>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        getBasicCourseByCourseId(courseId).then((res) => {
            setCourse(res);
        })
        getAllForumThreadsByForumCategoryId(categoryId).then((res) => {
            setForumThreads(res);
            setLoading(false);
        }).catch((err) => {
            console.log("Failed", err);
        })
        getForumCategoryByForumCategoryId(categoryId).then((res) => {
            setForumCategory(res);
            setLoading(false);
        })
    }, [props, courseId, categoryId])

    const formatDate = (date: Date) => {
        var d = new Date(date);
        return d.toDateString() + ', ' + d.toLocaleTimeString();
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickChron = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElChron(event.currentTarget);
    };
    
    const handleCloseChron = () => {
        setAnchorElChron(null);
    };

    const sortAtoZ = () => {
        const sorted = forumThreads
            .sort((a, b) => a.name.localeCompare(b.name));
        setForumThreads(sorted);
        handleClose();
    }

    const sortZtoA = () => {
        const sorted = forumThreads
            .sort((a, b) => b.name.localeCompare(a.name));
        setForumThreads(sorted);
        handleClose();
    }

    const sortOldestFirst = () => {
        const sorted = forumThreads
            .sort((a, b) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime());
        setForumThreads(sorted);
        handleCloseChron();
    }

    const sortNewestFirst = () => {
        const sorted = forumThreads
            .sort((a, b) => new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime());
        setForumThreads(sorted);
        handleCloseChron();
    }

    const handleSearchTerm = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);
    };

    console.log(searchTerm);

    const deleteThread = (threadId: number) => {
        deleteForumThread(threadId)
            .then((res) => {
                props.callOpenSnackBar("Thread successfully deleted", "success")
            })
            .catch((err) => {
                props.callOpenSnackBar(`Error in deleting thread: ${err}`, "error")
            })
    }

    const isTextMatched = (thread: ForumThread): boolean => {
        return (
            thread.name.toLowerCase().includes(searchTerm.toLowerCase()) 
        || thread.description.toLowerCase().includes(searchTerm.toLowerCase())
        || thread.account.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    return (
        loading ? <MessageContainer><CircularProgress style={{'color': '#323940'}}/></MessageContainer> :
        <ForumPageContainer>
            <HeadingWrapper>{course?.courseName}</HeadingWrapper>
            <SubHeadingWrapper>{course?.tutorName}</SubHeadingWrapper>
            <br /><br />
            <HeadingWrapper sub>
                {forumCategory?.name}
                <TextField
                    id="name-search"
                    variant="outlined"
                    label="Search For Thread"
                    onChange={event => handleSearchTerm(event.target.value)}
                    style={{ width: 300 }}
                />
                <SortIconWrapper>
                    <Tooltip title="Sort Alphabetically">
                        <IconButton onClick={handleClick}><SortAlphaIcon /></IconButton>
                    </Tooltip>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={sortAtoZ}>A to Z</MenuItem>
                        <MenuItem onClick={sortZtoA}>Z to A</MenuItem>
                    </Menu>
                    <Tooltip title="Sort Chronologically">
                        <IconButton onClick={handleClickChron}><SortOldNew /></IconButton>
                    </Tooltip>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorElChron}
                        keepMounted
                        open={Boolean(anchorElChron)}
                        onClose={handleCloseChron}
                    >
                        <MenuItem onClick={sortOldestFirst}>Old to New</MenuItem>
                        <MenuItem onClick={sortNewestFirst}>New to Old</MenuItem>
                    </Menu>
                </SortIconWrapper>
            </HeadingWrapper>
            <SubContentWrapper sub>{forumCategory?.description}</SubContentWrapper>
            {forumThreads.length === 0 ? <MessageContainer style={{'color': 'red'}}>No threads under this category.</MessageContainer> :
            <CategoryCard>
                <WidgetLgTable>
                    <WidgetLgTr>
                        <WidgetLgTh>Thread</WidgetLgTh>
                        <WidgetLgTh>Created By</WidgetLgTh>
                        <WidgetLgTh>Replies</WidgetLgTh>
                        <WidgetLgTh>Delete</WidgetLgTh>
                    </WidgetLgTr>
                    {forumThreads && forumThreads.filter(thread => {
                        if (searchTerm === "") {
                            return thread;
                        }
                        else if (searchTerm !== "" && isTextMatched(thread)) {
                            return thread;
                        }
                        else { return null; }
                    })
                    .map(t => {
                        return (
                            <WidgetLgTr>
                                <WidgetLgUser>
                                    <WidgetThreadLink to='#'>{t.name}</WidgetThreadLink>     
                                </WidgetLgUser>
                                <WidgetLgDate to='#'>{formatDate(t.timeStamp)}</WidgetLgDate>
                                <WidgetLgAmount>
                                    <WidgetLgLink to={`/viewuser/manageuser/${t.account.accountId}`}>
                                    <WidgetLgImg src={t.account.displayPictureUrl}></WidgetLgImg>
                                    {t.account.name}
                                    </WidgetLgLink>
                                </WidgetLgAmount>
                                <WidgetLgAmount><WidgetLgLink to='#'>{t.forumPosts.length}</WidgetLgLink></WidgetLgAmount>
                                <WidgetLgAmount>
                                <Tooltip title="Click to see more">
                                    <IconButton aria-label="Click to see more" onClick={() => deleteThread(t.forumThreadId)} color='secondary'>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                                </WidgetLgAmount>
                            </WidgetLgTr>
                        )
                    })

                    }
                </WidgetLgTable>
            </CategoryCard>}
        </ForumPageContainer>
    )
}

export default withRouter(ForumCategoryView);
