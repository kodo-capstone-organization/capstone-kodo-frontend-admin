import { BrowserRouter, Route, Switch } from "react-router-dom";
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
            <Layout />
                <Switch>
                    <Route path="/login" component={Login} exact />   
                    <Route path="/" component={HomePage} exact />
                    <Route path="/users" component={UserManagement} exact />
                    <Route path="/viewcourse/managecourses" component={ViewCourseList} exact />
                    <Route path="/viewcourse/managecourses/:courseId" component={ViewCourseDetails} exact />
                    <Route path="/viewcourse/tags" component={TagManagement} exact />
                </Switch>
        </BrowserRouter>
    )
}

export default Routes;