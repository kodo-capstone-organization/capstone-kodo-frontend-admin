import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import TagManagement from "./pages/TagManagementPage";
import CourseManagement from "./pages/CourseManagementPage"
import ViewUserList from "./pages/UserManagementPage/ViewUserList";
import ViewUserDetails from "./pages/UserManagementPage/ViewUserDetails";
import ViewCourseDetails from "./pages/CourseManagementPage/ViewCourseDetails";
import PlatformEarnings from "./pages/FinanceManagementPage/PlatformEarnings";
import CourseFinanceList from "./pages/FinanceManagementPage/CourseEarnings";
import CourseEarningDetails from "./pages/FinanceManagementPage/CourseEarnings/CourseEarningDetails";
import UserEarnings from "./pages/FinanceManagementPage/UserEarnings";
import UserEarningsDetails from "./pages/FinanceManagementPage/UserEarnings/UserEarningsDetails";
import TagEarnings from "./pages/FinanceManagementPage/TagManagement";
import TagEarningDetails from "./pages/FinanceManagementPage/TagManagement/TagEarningDetails";
import ForumPage from "./pages/ForumManagementPage";
import ForumCategoryView from "./pages/ForumManagementPage/components/CategoryView";
import ForumThreadView from "./pages/ForumManagementPage/components/ThreadView";
import NotFound from "./pages/NotFound";


import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';
import { severityList } from './values/Colours';

function Routes() {

    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [snackBarSeverity, setSnackBarSeverity] = useState("info");

    // To be propped into children components for them to call
    const callOpenSnackBar = (messageFromCaller, severityFromCaller) => {
        // severityList: error, warning, info, success ONLY
        if (!severityList.includes(severityFromCaller)) { // invalid severity received, default to info
            severityFromCaller = "info" 
        }

        // Set snackbar fields
        setSnackBarSeverity(severityFromCaller);
        setSnackBarMessage(messageFromCaller)

        // Finally, show the snackbar
        setIsSnackBarOpen(true)
    }

    const handleCloseSnackBar = () => {
        setIsSnackBarOpen(false)
        setSnackBarMessage("")
        setSnackBarSeverity("")
    }

    return (
        <BrowserRouter>
            <Route render={(props) => (
                <Layout {...props}>
                    {/*
                        Top level snackbar. Function to invoke the display are propped into
                        routes' main components as 'callOpenSnackBar'.
                    */}
                    {isSnackBarOpen &&
                    <Snackbar
                        id="kodo-snackbar"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        open={isSnackBarOpen}
                        onClose={handleCloseSnackBar}
                        autoHideDuration={5000}
                        TransitionComponent={transitionProps => <Slide {...transitionProps} direction="left" />}
                    >
                        <Alert onClose={handleCloseSnackBar} severity={snackBarSeverity}>
                            {snackBarMessage}
                        </Alert>
                    </Snackbar>}
                    <Switch>
                        <Route path="/" component={Login} exact>   
                        {window.sessionStorage.getItem("loggedInAccountId") ? <Redirect to="/finance/insights" /> : <Login />}
                        </Route>
                        {window.sessionStorage.getItem("loggedInAccountId") ? 
                        <Route path="/viewusers" render={props => <ViewUserList {...props} callOpenSnackBar={callOpenSnackBar} />} exact />
                        : <Redirect to="/" />}
                        {window.sessionStorage.getItem("loggedInAccountId") ? 
                        <Route path="/viewuser/manageuser/:accountId" render={props => <ViewUserDetails {...props} callOpenSnackBar={callOpenSnackBar} />} exact />
                        : <Redirect to="/" />}
                        {window.sessionStorage.getItem("loggedInAccountId") ? 
                        <Route path="/viewcourse/managecourses" component={CourseManagement} exact />
                        : <Redirect to="/" />}
                        {window.sessionStorage.getItem("loggedInAccountId") ? 
                        <Route path="/viewcourse/managecourses/:courseId" render={props => <ViewCourseDetails {...props} callOpenSnackBar={callOpenSnackBar} />} exact />
                        : <Redirect to="/" />}
                        {window.sessionStorage.getItem("loggedInAccountId") ? 
                        <Route path="/viewcourse/tags" render={props => <TagManagement {...props} callOpenSnackBar={callOpenSnackBar} />} exact />
                        : <Redirect to="/" />}
                        {window.sessionStorage.getItem("loggedInAccountId") ? 
                        <Route path="/finance/insights" component={PlatformEarnings} exact />
                        : <Redirect to="/" />}
                        {window.sessionStorage.getItem("loggedInAccountId") ? 
                        <Route path="/finance/courses" component={CourseFinanceList} exact />
                        : <Redirect to="/" />}
                        {window.sessionStorage.getItem("loggedInAccountId") ? 
                        <Route path="/finance/courses/:courseId" component={CourseEarningDetails} exact />
                        : <Redirect to="/" />}
                        {window.sessionStorage.getItem("loggedInAccountId") ? 
                        <Route path="/finance/users" component={UserEarnings} exact />
                        : <Redirect to="/" />}
                        {window.sessionStorage.getItem("loggedInAccountId") ? 
                        <Route path="/finance/users/:accountId" component={UserEarningsDetails} exact />
                        : <Redirect to="/" />}
                        {window.sessionStorage.getItem("loggedInAccountId") ? 
                        <Route path="/finance/tags" component={TagEarnings} exact />
                        : <Redirect to="/" />}
                        {window.sessionStorage.getItem("loggedInAccountId") ? 
                        <Route path="/finance/tags/:tagId" component={TagEarningDetails} exact />
                        : <Redirect to="/" />}
                        {window.sessionStorage.getItem("loggedInAccountId") ? 
                        <Route path="/viewcourse/forum/:courseId" render={props => <ForumPage {...props} callOpenSnackBar={callOpenSnackBar} />} exact />
                        : <Redirect to="/" />}
                        {window.sessionStorage.getItem("loggedInAccountId") ? 
                        <Route path="/viewcourse/forum/:courseId/category/:forumCategoryId" render={props => <ForumCategoryView {...props} callOpenSnackBar={callOpenSnackBar} />} exact />
                        : <Redirect to="/" />}
                        {window.sessionStorage.getItem("loggedInAccountId") ?
                        <Route path="/viewcourse/forum/:courseId/category/:forumCategoryId/thread/:forumThreadId" render={props => <ForumThreadView {...props} callOpenSnackBar={callOpenSnackBar} />} exact />
                        : <Redirect to="/" />}
                        <Route component={NotFound} />
                    </Switch>
                </Layout>
            )} />
                
        </BrowserRouter>
    )
}

export default Routes;