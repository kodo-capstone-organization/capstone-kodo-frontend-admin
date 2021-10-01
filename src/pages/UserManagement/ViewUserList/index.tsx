import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { getAllAccountsWithoutEnrollment, createNewAccount } from "../../../apis/Account/AccountApis";
import { getAllTags} from "../../../apis/Tag/TagApis";

import { Account } from "../../../apis/Entities/Account";
import { Tag } from "../../../apis/Entities/Tag";


import { UserListContainer, HeadingWrapper, DataGridContainer, BtnWrapper } from "./ViewUserElements";
import { Button } from "../../../values/ButtonElements";

import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { Autocomplete,ToggleButton,ToggleButtonGroup,Alert } from '@material-ui/lab';
import { DataGrid, GridToolbar, GridColDef, GridValueGetterParams, GridSelectionModel } from '@mui/x-data-grid';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { TextField, Chip, DialogTitle, DialogActions, DialogContent, DialogContentText, FormControlLabel, Checkbox } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

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
    const [accounts, setAccounts] = useState<Account[]>();
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
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [btnTags, setBtnTags] = useState<String[]>([]);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [chips, setChips] = useState<String[]>([]);
    const [tagLibrary, setTagLibrary] = useState<Tag[]>([]);
    const [signUpFailed, setSignUpFailed] = useState<String>("");
    const [btnTagFailed, setBtnTagFailed] = useState<Boolean>(false);
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

        //Btn
        if (btnTags.length === 0) {
            console.log('btn invalid');
            formIsValid = false;
            errors["btnTags"] = true;
            setBtnTagFailed(true)
        }

        setErrors(errors);
        if (formIsValid) {
            handleSignUp();
        }
        return formIsValid;
    }

    const showErrors = () => {
        if (signUpFailed)
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
                props.callOpenSnackBar("User account successfully downgraded", "success");
                handleCloseDialog();
            }).catch(err => {            
                setSignUpFailed(err.response.data.message)
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
        setIsDialogOpen(false)
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
                <Button primary to='#' onClick={handleOpenDialog}>Add User</Button>
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
                    <TextField error={errors["username"]} fullWidth required label="Username" variant="filled" value={username} onChange={e => setUsername(e.target.value)} />
                    <br />
                    <TextField error={errors["name"]} fullWidth required label="Name" variant="filled" value={name} onChange={e => setName(e.target.value)} />
                    <br />
                    <TextField error={errors["email"]} fullWidth required label="Email" variant="filled" value={email} onChange={e => setEmail(e.target.value)} />
                    <br />
                    <TextField error={errors["password"]} fullWidth required type="password" label="Password" variant="filled" value={password} onChange={e => setPassword(e.target.value)} />
                    <br />
                    <TextField error={errors["confirmPassword"]} fullWidth required type="password" label="Confirm Password" variant="filled" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    <br />
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
                                        <TextField {...params} variant="filled" label="What subjects are they interested in?" />
                                    )}
                                />
                                <br />
        </DialogContent>
        <DialogActions>
          <Button to='#' onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button to='#' onClick={handleValidation} primary>
            Add user
          </Button>
        </DialogActions>
      </Dialog>
        </UserListContainer>
    )
}

export default ViewUserList
