// import { Button } from "../../values/ButtonElements";
import Alert from '@material-ui/lab/Alert';
import { adminLogin as loginApi } from '../../apis/Account/AccountApis';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { Button } from '../../values/ButtonElements';
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
                loginCallback(res, username, password)
            })
            .catch(err => {                     
                setLoginFailed(err.response.data.message) 
            });
    }

    const loginCallback = (id: any, username: string, password: string) => {
        window.sessionStorage.setItem("loggedInAccountId", id);
        window.sessionStorage.setItem("loggedInAccountUsername", username);
        window.sessionStorage.setItem("loggedInAccountPassword", password);
        history.push('/homepage');
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
                            onChange={(e: any) => setUsername(e.target.value)}
                        ></LoginTextField>
                        <br/>
                        <LoginTextField 
                            id="filled-basic" 
                            label="password"
                            variant="filled"
                            type="password"
                            value={password}
                            onChange={(e: any) => setPassword(e.target.value)}
                        ></LoginTextField>
                        <br/>
                            <button style={{ display: "none" }} type="submit"></button>
                            <Button                             
                                big
                                fontBig 
                                primary
                                onClick={loginBtnClick}
                            >
                                Login
                            </Button>
                        <br/>
                        { showErrors() }
                        <br/>
                </LoginForm>
            </LoginPaper>
        </LoginPaperWrapper>        
    );
}

export default Login