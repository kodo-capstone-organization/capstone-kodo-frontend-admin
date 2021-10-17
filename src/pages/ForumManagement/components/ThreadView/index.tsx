import React, {useEffect, useState} from 'react'
import { withRouter, useHistory } from 'react-router-dom';

import { 
    ForumPageContainer, 
    HeadingWrapper, 
    SubHeadingWrapper, 
    SubContentWrapper, 
    MessageContainer,
    ProfileContainer,
    PostAccountImg,
    PostAccountName,
    PostListWrapper,
    PostWrapper,
    PostContainer,
    PaginationContainer,
    PostMessage,
    ReportContainer,
    ReportMessage,
} from "../../ForumElements"

import {
    CircularProgress,
    Button
} from '@material-ui/core';
import {
    Pagination
} from '@material-ui/lab';


import { ForumPost } from '../../../../apis/Entities/ForumPost';
import { ForumThread } from '../../../../apis/Entities/ForumThread';

import { 
    getAllReportedForumPostsOfAForumThread,
    getForumThreadByForumThreadId,
    deleteForumPost
} from "../../../../apis/Forum/ForumApis";

function ForumThreadView(props: any) {
    const courseId = parseInt(props.match.params.courseId);
    const categoryId = parseInt(props.match.params.forumCategoryId);
    const threadId = parseInt(props.match.params.forumThreadId);
    const [forumPosts, setForumPosts] = useState<ForumPost[]>();
    const [forumThread, setForumThread] = useState<ForumThread>();
    const [loading, setLoading] = useState<boolean>(true);
    const [pageNumber, setPageNumber] = useState<number>(1);

    useEffect(() => {
        setLoading(true);
        getForumThreadByForumThreadId(threadId).then((res) => {
            setForumThread(res);
        })
        getAllReportedForumPostsOfAForumThread(threadId).then((res) => {
            setForumPosts(res);
            setLoading(false);
        })
    }, [props, courseId, categoryId, threadId])
    console.log(forumPosts);

    function changePage(offset: number) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    const deletePost = (postId: number) => {
        deleteForumPost(postId)
            .then((res) => {
                props.callOpenSnackBar("Post successfully deleted", "success")
            })
            .catch((err) => {
                props.callOpenSnackBar(`Error in deleting post: ${err}`, "error")
            })
    }

    return (
        loading ? <MessageContainer><CircularProgress style={{'color': '#323940'}}/></MessageContainer> :
        <ForumPageContainer>
            <HeadingWrapper>Reported Posts: {forumThread?.name}</HeadingWrapper>
            <SubHeadingWrapper sub>{forumThread?.description}</SubHeadingWrapper>
            {forumPosts && forumPosts.length === 0 ? <MessageContainer style={{'color': 'red'}}>No posts reported under this thread.</MessageContainer> :
            <PostListWrapper>
            {forumPosts?.map(p => {
                return (
                    <PostContainer>
                        <PostWrapper>
                            <ProfileContainer>
                                <PostAccountImg src={p.account.displayPictureUrl}></PostAccountImg>
                                <PostAccountName>{p.account.name}</PostAccountName>
                                <Button variant="outlined"  onClick={() => deletePost(p.forumPostId)} color="secondary">Delete</Button>
                            </ProfileContainer>
                            <PostMessage>{p.message}</PostMessage>
                            <br />
                            <ReportContainer>
                                <ReportMessage head>Report Details</ReportMessage>
                                <br />
                                <ReportMessage>{p.reasonForReport}</ReportMessage>
                            </ReportContainer>
                        </PostWrapper>
                    </PostContainer>
                )
            })
            }
            <PaginationContainer>
                <Pagination count={10} variant="outlined" />
            </PaginationContainer>
            </PostListWrapper>
            }
        </ForumPageContainer>
    )
}

export default withRouter(ForumThreadView);
