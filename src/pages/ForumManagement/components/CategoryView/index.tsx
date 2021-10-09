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
    DeleteIcon 
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

import CircularProgress from '@material-ui/core/CircularProgress';

const ForumCategoryView = (props: any) => {
    const courseId = parseInt(props.match.params.courseId);
    const categoryId = parseInt(props.match.params.forumCategoryId);
    const [course, setCourse] = useState<CourseBasicResp>();
    const [forumCategory, setForumCategory] = useState<ForumCategory>();
    const [forumThreads, setForumThreads] = useState<ForumThread[]>([]);
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

    const deleteThread = (threadId: number) => {
        console.log(threadId);
    }

    return (
        loading ? <MessageContainer><CircularProgress style={{'color': '#323940'}}/></MessageContainer> :
        <ForumPageContainer>
            <HeadingWrapper>{course?.courseName}</HeadingWrapper>
            <SubHeadingWrapper>{course?.tutorName}</SubHeadingWrapper>
            <br /><br />
            <HeadingWrapper sub>{forumCategory?.name}</HeadingWrapper>
            <SubContentWrapper sub>{forumCategory?.description}</SubContentWrapper>
            {forumThreads.length === 0 ? <MessageContainer style={{'color': 'red'}}>No threads under this category.</MessageContainer> :
            <CategoryCard>
                <WidgetLgTable>
                    <WidgetLgTr>
                        <WidgetLgTh>Thread</WidgetLgTh>
                        <WidgetLgTh>Replies</WidgetLgTh>
                        <WidgetLgTh>Delete</WidgetLgTh>
                    </WidgetLgTr>
                    {forumThreads && forumThreads.map(t => {
                        return (
                            <WidgetLgTr>
                                <WidgetLgUser>
                                    <WidgetLgImg src={t.account.displayPictureUrl}></WidgetLgImg>
                                    <WidgetThreadLink to='#'>{t.name}</WidgetThreadLink>               
                                </WidgetLgUser>
                                <WidgetLgDate to='#'>{formatDate(t.timeStamp)}</WidgetLgDate>
                                <WidgetLgAmount><WidgetLgLink to='#'>{t.forumPosts.length}</WidgetLgLink></WidgetLgAmount>
                                <WidgetLgAmount><WidgetLgLink onClick={deleteThread} to='#'><DeleteIcon /></WidgetLgLink></WidgetLgAmount>
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
