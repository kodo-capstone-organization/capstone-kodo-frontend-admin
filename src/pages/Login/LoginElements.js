import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import styled from "styled-components";
import { Typography } from '@material-ui/core';
import { colours } from "../../values/Colours";

export const LoginPaperWrapper = styled.div`
    background: ${colours.GRAY2};
    z-index: -1;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const LoginPaper = styled(Paper)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
    height: 25%;
    min-width: 500px;
    min-height: 400px;
    padding: 3rem;
`;

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const LoginFormTitle = styled(Typography)`
    color: ${colours.GRAY2};
    font-weight: bold;    
`;

export const LoginTextField = styled(TextField)`
    width: 100%;
`;