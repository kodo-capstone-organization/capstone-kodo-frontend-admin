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
    Button,
    Tooltip,
} from '@material-ui/core';
import {
    Pagination
} from '@material-ui/lab';


import { ForumPost, ToggleForumPostResp } from '../../../../apis/Entities/ForumPost';
import { ForumThread } from '../../../../apis/Entities/ForumThread';

import { 
    getAllReportedForumPostsOfAForumThread,
    getForumThreadByForumThreadId,
    deleteForumPost,
    toggleReport,
} from "../../../../apis/Forum/ForumApis";

function ForumThreadView(props: any) {
    const courseId = parseInt(props.match.params.courseId);
    const categoryId = parseInt(props.match.params.forumCategoryId);
    const threadId = parseInt(props.match.params.forumThreadId);
    const [forumPosts, setForumPosts] = useState<ForumPost[]>();
    const [forumThread, setForumThread] = useState<ForumThread>();
    const [loading, setLoading] = useState<boolean>(true);

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

    const deletePost = (postId: number) => {
        console.log("delete entered")
        deleteForumPost(postId)
            .then((res) => {
                console.log("Delete Response:", res)
                props.callOpenSnackBar("Post successfully deleted", "success")
            })
            .catch((err) => {
                props.callOpenSnackBar(`Error in deleting post: ${err}`, "error")
            })
    }

    const togglePostReport = (postId: number) => {
        console.log("toggle entered");
        const myAccountId = window.sessionStorage.getItem("loggedInAccountId");
        if(myAccountId != null) {
            toggleReport(postId, parseInt(myAccountId))
                .then((res: any) => {
                    console.log("Toggle Response:",res);
                    props.callOpenSnackBar("Post successfully updated", "success")
                })
                .catch((err) => {
                    props.callOpenSnackBar(`Error in updating post: ${err}`, "error")
                })
        }
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
                                <Tooltip title="Pressing this will delete this post.">
                                    <Button variant="outlined"  onClick={() => deletePost(p.forumPostId)} color="secondary">Accept Report</Button>
                                </Tooltip>
                                <Tooltip title="Pressing this will reject this report and restore the post.">
                                    <Button variant="outlined"  onClick={() => togglePostReport(p.forumPostId)} color="primary">Reject Report</Button>
                                </Tooltip>
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
            </PostListWrapper>
            }
        </ForumPageContainer>
    )
}

export default withRouter(ForumThreadView);
