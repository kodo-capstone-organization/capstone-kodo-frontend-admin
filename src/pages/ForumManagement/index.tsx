import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom';

import { CourseBasicResp } from '../../apis/Entities/Course'
import { ForumCategory } from '../../apis/Entities/ForumCategory'
import { getAllForumCategoriesWithForumThreadsOnlyByCourseId as getAllForumCategoriesByCourseId, deleteForumCategory } from "../../apis/Forum/ForumApis";
import { getBasicCourseByCourseId } from '../../apis/Course/CourseApis';

import { 
    ForumPageContainer, 
    HeadingWrapper, 
    SubHeadingWrapper, 
    MessageContainer, 
    WidgetLgTable, WidgetLgTr, 
    WidgetLgLink, 
    WidgetLgTh, 
    WidgetLgAmount, 
    WidgetCategoryLink, 
    CategoryCard, 
    DeleteIcon,
    SortAlphaIcon,
} from './ForumElements'

import {
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    DialogTitle,
    Dialog,
    IconButton,
    Tooltip
} from '@material-ui/core';

const ForumPage = (props: any) => {
    const courseId = parseInt(props.match.params.courseId);
    const [course, setCourse] = useState<CourseBasicResp>();
    const [forumCategories, setForumCategories] = useState<ForumCategory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        getBasicCourseByCourseId(courseId).then((res) => {
            setCourse(res);
        })
        getAllForumCategoriesByCourseId(courseId).then((res) => {
            setForumCategories(res);
            setLoading(false);
        }).catch((err) => {
            console.log("Failed", err);
        })
        setLoading(false);
    }, [props, courseId])

    const deleteCategory = (catId: number) => {
        deleteForumCategory(catId)
            .then((res) => {
                props.callOpenSnackBar("Category deleted", "success")
            })
            .catch((err) => {
                props.callOpenSnackBar(`Error in deleting category: ${err}`, "error")
            })
    }

    return (
        loading ? <MessageContainer><CircularProgress style={{'color': '#323940'}}/></MessageContainer> :
        <ForumPageContainer>
            <HeadingWrapper>{course?.courseName}</HeadingWrapper>
            <SubHeadingWrapper>by {course?.tutorName}</SubHeadingWrapper>
            <br />
            <HeadingWrapper sub>All Categories</HeadingWrapper>
           {forumCategories.length === 0 ? <MessageContainer style={{'color': 'red'}}>No forum under this course.</MessageContainer> : 
           <CategoryCard>
            <WidgetLgTable>
                <WidgetLgTr>
                    <WidgetLgTh>Category</WidgetLgTh>
                    <WidgetLgTh>Threads</WidgetLgTh>
                    <WidgetLgTh>Delete</WidgetLgTh>
                </WidgetLgTr>
                {forumCategories && forumCategories.map(c => {
                    return (
                        <WidgetLgTr>
                            <WidgetLgAmount><WidgetCategoryLink to={`/viewcourse/forum/${courseId}/category/${c.forumCategoryId}`}>{c.name}</WidgetCategoryLink></WidgetLgAmount>
                            <WidgetLgAmount><WidgetLgLink>{c.forumThreads.length}</WidgetLgLink></WidgetLgAmount>
                            <WidgetLgAmount>
                            <Tooltip title="Delete">
                                <IconButton aria-label="delete" onClick={() => deleteCategory(c.forumCategoryId)} color='secondary'>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                            </WidgetLgAmount>
                        </WidgetLgTr>
                    )
                })}
            </WidgetLgTable>
            </CategoryCard>
            }
        </ForumPageContainer>
    )
}

export default withRouter(ForumPage)

