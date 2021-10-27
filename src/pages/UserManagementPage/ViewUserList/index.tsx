import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { getAllAccountsWithoutEnrollment, createNewAccount } from "../../../apis/AccountApis";
import { getAllTags} from "../../../apis/TagApis";

import { Account } from "../../../entities/Account";
import { Tag } from "../../../entities/Tag";

import { UserListContainer, HeadingWrapper, DataGridContainer, BtnWrapper } from "./ViewUserElements";
import { Button, ButtonNoLink } from "../../../values/ButtonElements";

import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { Autocomplete,ToggleButton,ToggleButtonGroup,Alert } from '@material-ui/lab';
import { DataGrid, GridToolbar, GridColDef, GridValueGetterParams, GridSelectionModel } from '@mui/x-data-grid';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { TextField, Chip, DialogTitle, DialogActions, DialogContent, DialogContentText, FormControlLabel, Checkbox } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Name',
        width: 250,
    },
    {
        field: 'username',
        headerName: 'Username',
        width: 150,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 250,
    },
    {
        field: 'admin',
        headerName: 'Is Admin',
        width: 250,
        type: 'boolean',
    }
];

interface IErrors<TValue> {
    [id: string]: TValue;
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function ViewUserList(props: any) {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [loading, setLoading] = useState<Boolean>(true);
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [fullWidth, setFullWidth] = useState<boolean>(true);
    const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('sm');
    // For creating account
    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<Boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<Boolean>(false);
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [btnTags, setBtnTags] = useState<String[]>([]);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [chips, setChips] = useState<String[]>([]);
    const [tagLibrary, setTagLibrary] = useState<Tag[]>([]);
    const [signUpFailed, setSignUpFailed] = useState<String>("");
    const [btnTagFailed, setBtnTagFailed] = useState<Boolean>(false);
    const [emailError, setEmailError] = useState<Boolean>(false);
    var [errors, setErrors] = useState<IErrors<any>>({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        btnTags: "",
        signUp: ""
    });

    const history = useHistory();
    
    useEffect(() => {
        setLoading(true);
        getAllAccountsWithoutEnrollment().then(allAccounts => {
            setAccounts(allAccounts);
        });
        getAllTags().then(res => setTagLibrary(res)).catch(error => console.log("error getting tags."))
        setLoading(false);
    }, []);

    var data = accounts?.map((account) => {
        return {
            id: account.accountId,
            name: account.name,
            username: account.username,
            email: account.email,
            admin: account.isAdmin
        }
    });

    var accountId: number = +(selectionModel[0])

    const classes = useStyles();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleChipChange = (e: object, value: String[], reason: string) => {
        console.log(value)
        setChips(value)
    }

    const handleBtnTag = (event: React.SyntheticEvent, newBtnTag: string) => {
        setBtnTagFailed(false)
        setBtnTags([newBtnTag])
    }

    const handleValidation = () => {
        let formIsValid = true;
        errors = {};
        setEmailError(false);
        setBtnTagFailed(false)

        //Username
        if (username === "") {
            formIsValid = false;
            errors["username"] = true;
        }

        //Name
        if (name === "") {
            formIsValid = false;
            errors["name"] = true;
        }
        //Email
        if (email === "") {
            formIsValid = false;
            errors["email"] = true;
        }
        if (typeof email !== "undefined") {
            let lastAtPos = email.lastIndexOf('@');
            let lastDotPos = email.lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = true;
                setEmailError(true);
            }
        }

        //Password
        if (password === "") {
            formIsValid = false;
            errors["password"] = true;
        }

        //Confirm Password
        if (confirmPassword === "") {
            formIsValid = false;
            errors["confirmPassword"] = true;
        }

        setErrors(errors);
        if (formIsValid) {
            handleSignUp();
        }
        return formIsValid;
    }

    const showErrors = () => {
        if (emailError) {
            return(<Alert variant="filled" severity="error">Email is not valid</Alert>);
        }
        else if (!emailError && signUpFailed)
        {
            return(<Alert variant="filled" severity="error">{signUpFailed}</Alert>);
        }     
        else
        {
            return "";
        }
    }

    const handleSignUp = () => {
        // const chipsToString = chips.map((chip) => chip.title)
        const tagTitles = btnTags.concat(chips)
        var newUserAccount =
        {
            username,
            password,
            name,
            bio: "",
            email,
            isAdmin,
            tagTitles
        }
        
        if (password === confirmPassword)
        {
            //@ts-ignore        
            createNewAccount(newUserAccount, null).then((res: Account) => {
                props.callOpenSnackBar("User account successfully created", "success");
                handleCloseDialog();

                accounts.push(res)
                setAccounts(accounts);
            }).catch(err => {            
                setSignUpFailed(err.response.data.message);
            })
        }
        else
        {
            setSignUpFailed("Password and confirmation does not match");
        }
    };

    const handleOpenDialog = () => {
        setIsDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setErrors({});
        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setBtnTags([]);
        setIsAdmin(false);
        setIsDialogOpen(false);
        setSignUpFailed("");
        setBtnTagFailed(false);
        setChips([]);
        setIsDialogOpen(false);
        setEmailError(false);
    }

    const handleMaxWidthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setMaxWidth(event.target.value as DialogProps['maxWidth']);
      };
    
    const handleFullWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFullWidth(event.target.checked);
      };

      const handleAdmin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAdmin( event.target.checked );
      };
      console.log(isAdmin);

    return (
        <UserListContainer>
            <HeadingWrapper>
                Users
                <BtnWrapper>
                    <ButtonNoLink primary onClick={handleOpenDialog} style={{ 'width': '150px'}}>Add User</ButtonNoLink>
                </BtnWrapper>
            </HeadingWrapper>
            <DataGridContainer>
                {data &&
                    <DataGrid
                        getRowId={(row) => row.id}
                        rows={data}
                        columns={columns}
                        onSelectionModelChange={(newSelectionModel) => {
                            setSelectionModel(newSelectionModel);
                        }}
                        selectionModel={selectionModel}
                    />
                }
            </DataGridContainer>
            <BtnWrapper>
                {selectionModel.length === 0 &&
                    <Button disabled>Select a user</Button>
                }
                {selectionModel.length > 0 &&
                    <Button primary to={`/viewuser/manageuser/${accountId}`}>View Details</Button>
                }
            </BtnWrapper>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog} aria-labelledby="form-dialog-title" fullWidth={fullWidth} maxWidth={maxWidth}>
                <DialogTitle id="form-dialog-title">Add User</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Start adding user.
                </DialogContentText>
                { showErrors() }
                    <TextField error={errors["username"]} fullWidth required label="Username" variant="standard" value={username} onChange={e => setUsername(e.target.value)} />
                    <br /><br />
                    <TextField error={errors["name"]} fullWidth required label="Name" variant="standard" value={name} onChange={e => setName(e.target.value)} />
                    <br /><br />
                    <TextField error={errors["email"]} fullWidth required label="Email" variant="standard" value={email} onChange={e => setEmail(e.target.value)} />
                    <br /><br />
                    <FormControl variant="filled" fullWidth>
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password" 
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
                            ></Input>
                        </FormControl>
                    <br /><br />
                    <FormControl variant="filled" fullWidth>
                        <InputLabel htmlFor="standard-adornment-confirm-password">Confirm Password</InputLabel>
                                <Input
                                    id="standard-adornment-confirm-password" 
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e: any) => setConfirmPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownConfirmPassword}
                                        >
                                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                        </InputAdornment>
                                    }
                            ></Input>
                        </FormControl>
                    <br /><br />
                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={isAdmin}
                            onChange={handleAdmin}
                            name="checked"
                            color="primary"
                        />
                        }
                        label="Admin"
                    />
                    <br /><br />
                    <label style={{ 
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                    }}>Join Kodo as a</label>
                    <br />
                    <ToggleButtonGroup
                                    value={btnTags}
                                    exclusive
                                    onChange={handleBtnTag}
                                    style={{ 
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <ToggleButton 
                                        style={{ 
                                            borderColor: btnTagFailed ? "#f44336" : "rgba(0, 0, 0, 0.12)",
                                            color: btnTagFailed ? "#f44336" : "rgba(0, 0, 0, 0.38)"                                          
                                        }} 
                                        value="beginner"
                                    >
                                            Beginner
                                    </ToggleButton>
                                    <ToggleButton 
                                        style={{ 
                                            borderColor: btnTagFailed ? "#f44336" : "rgba(0, 0, 0, 0.12)",
                                            color: btnTagFailed ? "#f44336" : "rgba(0, 0, 0, 0.38)"                           
                                        }} 
                                        value="intermediate"
                                    >
                                            Intermediate
                                    </ToggleButton>
                                    <ToggleButton 
                                        style={{ 
                                            borderColor: btnTagFailed ? "#f44336" : "rgba(0, 0, 0, 0.12)",
                                            color: btnTagFailed ? "#f44336" : "rgba(0, 0, 0, 0.38)"                       
                                        }} 
                                        value="expert"
                                    >
                                        Expert
                                    </ToggleButton>
                        </ToggleButtonGroup>
                                <br />
                                <Autocomplete
                                    multiple
                                    options={tagLibrary.map((option) => option.title)}
                                    defaultValue={[]}
                                    onChange={handleChipChange}
                                    freeSolo
                                    renderTags={(value: string[], getTagProps) =>
                                        value.map((option: string, index: number) => (
                                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                        ))
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} variant="standard" label="What subjects are they interested in?" />
                                    )}
                                />
                                <br />
        </DialogContent>
        <DialogActions>
          <ButtonNoLink onClick={handleCloseDialog} style={{ 'width': '100px'}}>
            Cancel
          </ButtonNoLink>
          <ButtonNoLink onClick={handleValidation} primary style={{ 'width': '100px'}}>
            Add user
          </ButtonNoLink>
        </DialogActions>
      </Dialog>
        </UserListContainer>
    )
}

export default ViewUserList
