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
    LoginTextField,
    LoginPasswordField
} from "./LoginElements";

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';



function Login()
{
    const [auth, setAuth] = useState<boolean>(true);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginFailed, setLoginFailed] = useState<string>("");
    const [showPassword, setShowPassword] = useState<Boolean>(false);

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

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const loginCallback = (id: any, username: string, password: string) => {
        window.sessionStorage.setItem("loggedInAccountId", id);
        window.sessionStorage.setItem("loggedInAccountUsername", username);
        window.sessionStorage.setItem("loggedInAccountPassword", password);
        history.push('/finance/insights');
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
                        <FormControl variant="filled">
                            <InputLabel htmlFor="filled-adornment-password">password</InputLabel>
                                <LoginPasswordField 
                                    id="filled-adornment-password" 
                                    label="password"
                                    variant="filled"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e: any) => setPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                        </InputAdornment>
                                    }
                            ></LoginPasswordField>
                        </FormControl>
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