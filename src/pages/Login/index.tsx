// import { Button } from "../../values/ButtonElements";
import Alert from '@material-ui/lab/Alert';
import { login as loginApi } from '../../apis/Account/AccountApis';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { Button } from "@material-ui/core";
import {
    LoginForm,
    LoginFormTitle,
    LoginPaper, 
    LoginPaperWrapper,
    LoginTextField
} from "./LoginElements";


function Login()
{
    const [auth, setAuth] = useState<boolean>(true);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginFailed, setLoginFailed] = useState<string>("");

    let history = useHistory();

    const loginBtnClick = (e: any) => {
        setAuth(!auth);
        e.preventDefault();
        loginApi(username, password)
            .then(res => {
                loginCallback.bind(res, username, password)
            })
            .catch(err => {                                
                setLoginFailed(err.response.data.message)
            });
    }

    const loginCallback = (id: string, username: string, password: string) => {
        window.sessionStorage.setItem("loggedInAccountId", id);
        window.sessionStorage.setItem("loggedInAccountUsername", username);
        window.sessionStorage.setItem("loggedInAccountPassword", password);
        history.push('/');
    }

    const showErrors = () => {
        if (loginFailed)
        {
            return(<Alert variant="filled" severity="error">{loginFailed}</Alert>);
        }
        else
        {
            return "";
        }
    }

    return (
        <LoginPaperWrapper>            
            <LoginPaper elevation={3}>
                <LoginFormTitle variant="h4">
                    Login
                </LoginFormTitle>
                <br/>
                <LoginForm 
                    noValidate 
                    autoComplete="off"
                    onSubmit={loginBtnClick}>
                        <LoginTextField 
                            id="filled-basic" 
                            label="username"
                            variant="filled"
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        ></LoginTextField>
                        <br/>
                        <LoginTextField 
                            id="filled-basic" 
                            label="password"
                            variant="filled"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        ></LoginTextField>
                        <br/>
                            <button style={{ display: "none" }} type="submit"></button>
                            <Button color="primary" variant="contained" onClick={loginBtnClick}>Login</Button>
                            {/* <Button                             
                                big
                                fontBig 
                                primary
                            >
                                Login
                            </Button> */}
                        <br/>
                        { showErrors() }
                        <br/>
                </LoginForm>
            </LoginPaper>
        </LoginPaperWrapper>        
    );
}

export default Login