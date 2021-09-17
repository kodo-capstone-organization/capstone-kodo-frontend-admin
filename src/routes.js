import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import UserManagement from "./pages/UserManagement";

function Routes() {
    return (
        <BrowserRouter>
            <Layout />
                <Switch>
                    <Route path="/login" component={Login} exact />   
                    <Route path="/" component={HomePage} exact />
                    <Route path="/users" component={UserManagement} exact />
                </Switch>
        </BrowserRouter>
    )
}

export default Routes;