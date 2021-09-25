import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import TagManagement from "./pages/TagManagement";
import ViewCourseList from "./pages/CourseManagement/ViewCourseList";
import ViewUserList from "./pages/UserManagement/ViewUserList";
import ViewUserDetails from "./pages/UserManagement/ViewUserDetails";
import ViewCourseDetails from "./pages/CourseManagement/ViewCourseDetails";
import PlatformEarnings from "./pages/FinanceManagement/PlatformEarnings";
import NotFound from "./pages/NotFound";

function Routes() {
    return (
        <BrowserRouter>
            <Route render={(props) => (
                <Layout {...props}>
                    <Switch>
                        <Route path="/" component={Login} exact>   
                        {window.sessionStorage.getItem("loggedInAccountId") ? <Redirect to="/login" /> : <Login />}
                        </Route>
                        <Route path="/login" component={Login} exact />
                        {window.sessionStorage.getItem("loggedInAccountId") ? 
                        <Route path="/viewusers" component={ViewUserList} exact />
                        : <Redirect to="/" />}
                        {window.sessionStorage.getItem("loggedInAccountId") ? 
                        <Route path="/viewuser/manageuser/:accountId" component={ViewUserDetails} exact />
                        : <Redirect to="/" />}
                        {window.sessionStorage.getItem("loggedInAccountId") ? 
                        <Route path="/viewcourse/managecourses" component={ViewCourseList} exact />
                        : <Redirect to="/" />}
                        {window.sessionStorage.getItem("loggedInAccountId") ? 
                        <Route path="/viewcourse/managecourses/:courseId" component={ViewCourseDetails} exact />
                        : <Redirect to="/" />}
                        {window.sessionStorage.getItem("loggedInAccountId") ? 
                        <Route path="/viewcourse/tags" component={TagManagement} exact />
                        : <Redirect to="/" />}
                        {window.sessionStorage.getItem("loggedInAccountId") ? 
                        <Route path="/finance/insights" component={PlatformEarnings} exact />
                        : <Redirect to="/" />}
                        <Route component={NotFound} />
                    </Switch>
                </Layout>
            )} />
                
        </BrowserRouter>
    )
}

export default Routes;