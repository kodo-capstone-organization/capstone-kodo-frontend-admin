import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import UserManagement from "./pages/UserManagement";
import TagManagement from "./pages/TagManagement";
import ViewCourseList from "./pages/CourseManagement/ViewCourseList";
import ViewCourseDetails from "./pages/CourseManagement/ViewCourseDetails";

function Routes() {
    return (
        <BrowserRouter>
            <Route render={(props) => (
                <Layout {...props}>
                    <Switch>
                        <Route path="/" component={Login} exact>   
                        {window.sessionStorage.getItem("loggedInAccountId") ? <Redirect to="/users" /> : <Login />}
                        </Route>
                        <Route path="/login" component={Login} exact />
                        {window.sessionStorage.getItem("loggedInAccountId") ? 
                        <Route path="/users" component={UserManagement} exact />
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
                    </Switch>
                </Layout>
            )} />
                
        </BrowserRouter>
    )
}

export default Routes;