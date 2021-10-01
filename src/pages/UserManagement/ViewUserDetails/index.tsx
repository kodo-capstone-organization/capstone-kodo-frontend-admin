import { useState, useEffect, useReducer } from 'react'
import { withRouter, useHistory } from 'react-router-dom';
import { getAccountByAccountId, deactivateAccount, reactivateAccount, upgradeAccount, downgradeAccount } from './../../../apis/Account/AccountApis';
import { Account } from "../../../apis/Entities/Account";
import { Button } from "../../../values/ButtonElements";

import { UserDetailsContainer, HeadingWrapper, DetailsCard, DetailsWrapper, CardTitle, CardDescription, RowTitle, ChipWrapper, BtnWrapper } from "./ViewUserDetailsElements"
import EnrolledCoursesTable from "./EnrolledCoursesTable/EnrolledCoursesTable";
import TutoringCoursesTable from "./TutoringCoursesTable/TutoringCoursesTable";
import { Button as DeactivateButton } from '@material-ui/core';
import { TextField, Chip, Dialog, DialogTitle, DialogActions, DialogContent, } from "@material-ui/core";

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PanToolIcon from '@material-ui/icons/PanTool';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import PersonIcon from '@material-ui/icons/Person';

const formReducer = (state: any, event: any) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function ViewUserDetails(props: any) {
    const accountId = props.match.params.accountId;
    const [accountFormData, setAccountFormData] = useReducer(formReducer, {});
    const [loading, setLoading] = useState<boolean>(true);
    const [account, setAccount] = useState<Account>();
    const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState<boolean>(false);
    const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState<boolean>(false);
    const history = useHistory();

    useEffect(() => {
        getAccountByAccountId(accountId).then((account: Account) => {
            setAccount(account);
        })
    });

    useEffect(() => {
        setLoading(true)
        getAccountByAccountId(accountId).then((receivedAccount: Account) => {
            Object.keys(receivedAccount).map((key, index) => {
                let wrapperEvent = {
                    target: {
                        name: key,
                        value: Object.values(receivedAccount)[index]
                    }
                }
                handleFormDataChange(wrapperEvent)
            })
        });

    }, [accountId]);

    const handleFormDataChange = (event: any) => {
        setAccountFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const handleOpenDeactivateDialog = () => {
        setIsDeactivateDialogOpen(true)
    }

    const handleCloseDeactivateDialog = () => {
        setIsDeactivateDialogOpen(false)
    }

    const handleOpenUpgradeDialog = () => {
        setIsUpgradeDialogOpen(true)
    }

    const handleCloseUpgradeDialog = () => {
        setIsUpgradeDialogOpen(false)
    }

    const handleDeactivateAccount = () => {
        const adminAccountId = window.sessionStorage.getItem("loggedInAccountId");
        if (accountId !== undefined && adminAccountId !== null) {
            deactivateAccount(accountId, parseInt(adminAccountId))
                .then((res) => {
                    history.push("/viewusers")
                    props.callOpenSnackBar("User account successfully deactivated", "success");
                    handleCloseDeactivateDialog();
                })
                .catch((error) => {
                    props.callOpenSnackBar(`Error in deactivated user account: ${error}`, "error");
                    handleCloseDeactivateDialog(); 
                });         
        }
    };

    const handleReactivateAccount = () => {
        const adminAccountId = window.sessionStorage.getItem("loggedInAccountId");
        if (accountId !== undefined && adminAccountId !== null) {
            reactivateAccount(accountId, parseInt(adminAccountId))
                .then((res) => {
                    history.push("/viewusers")
                    props.callOpenSnackBar("User account successfully reactivated", "success");
                    handleCloseDeactivateDialog();
                })
                .catch((error) => {
                    props.callOpenSnackBar(`Error in reactivated user account: ${error}`, "error");
                    handleCloseDeactivateDialog();
                });         
        }
    };

    const  getToggleKeyword = () => {
        return accountFormData.isActive ? "deactivating" : "reactivating"
    }

    const  getDialogKeyword = () => {
        return accountFormData.isAdmin ? "downgrading" : "upgrading"
    }

    const  isAdmin = () => {
        return accountFormData.isAdmin ? "Admin" : "Normal User"
    }

    const handleUpgrade = () => {
        if (accountId !== undefined) {
            upgradeAccount(accountId)
                .then((res) => {
                    history.push("/viewusers")
                    props.callOpenSnackBar("User account successfully upgradd", "success");
                    handleCloseUpgradeDialog();
                })
                .catch((error => {
                    props.callOpenSnackBar(`Error in upgrading user account: ${error}`, "error");
                    handleCloseUpgradeDialog();
                }));         
        }
    }
    const handleDowngrade = () => {
        if (accountId !== undefined) {
            downgradeAccount(accountId)
                .then((res) => {
                    history.push("/viewusers")
                    props.callOpenSnackBar("User account successfully downgraded", "success");
                    handleCloseUpgradeDialog();
                })
                .catch((error) => {
                    props.callOpenSnackBar(`Error in downgraded user account: ${error}`, "error");
                    handleCloseUpgradeDialog();
                });         
        }
    }

    return (
        <>
        <UserDetailsContainer>
            <HeadingWrapper>
                User Profile
                <DeactivateButton color={accountFormData.isActive ? "secondary" : "primary"} onClick={handleOpenDeactivateDialog}>
                    {accountFormData.isActive && <><PersonAddDisabledIcon /> &nbsp; Deactivate Account</>}
                    {!accountFormData.isActive && <><PersonIcon /> &nbsp; Reactivate Account</>}
                </DeactivateButton>
            </HeadingWrapper>
            <DetailsCard>
                <DetailsWrapper>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription></CardDescription>
                    <RowTitle>Name</RowTitle>
                    <CardDescription>{accountFormData.name}</CardDescription>
                    <RowTitle>Username</RowTitle>
                    <CardDescription>{accountFormData.username}</CardDescription>
                    <RowTitle>Email</RowTitle>
                    <CardDescription>{accountFormData.email}</CardDescription>
                    <RowTitle>Bio</RowTitle>
                    <CardDescription>{accountFormData.bio}</CardDescription>
                    <RowTitle>Interests</RowTitle>
                    <ChipWrapper>
                    {account?.interests.map((tag) => (
                        <Chip key={tag.title} label={tag.title} variant="outlined" />
                    ))}
                    </ChipWrapper>
                    <RowTitle>Type of account</RowTitle>
                    <CardDescription>{isAdmin()}</CardDescription>
                </DetailsWrapper>
            </DetailsCard>
            <BtnWrapper>
                {!account?.isAdmin &&
                <Button to='#' primary onClick={handleOpenUpgradeDialog}>Upgrade User To Admin</Button>
                }
                {account?.isAdmin &&
                <Button to='#' primary onClick={handleOpenUpgradeDialog}>Downgrade User To A Normal User</Button>
                }
            </BtnWrapper>
        </UserDetailsContainer>
        <EnrolledCoursesTable account={accountId}/>
        <TutoringCoursesTable account={accountId}/>
        <Dialog fullWidth open={isDeactivateDialogOpen} onClose={handleCloseDeactivateDialog} aria-labelledby="toggle-dialog">

                <DialogTitle id="toggle-dialog-title">
                    Are you sure of <strong>{ getToggleKeyword() }</strong> {accountFormData.name}'s account?
                </DialogTitle>
                <DialogContent>
                    { accountFormData.isActive &&  <>User will not be able to login into their account.</> }
                    { !accountFormData.isActive &&  <>Users can login to their account now.</> }
                </DialogContent>
                <br/>
                <DialogActions>
                    <Button to= '#' onClick={handleCloseDeactivateDialog}>
                        Cancel
                    </Button>
                    {accountFormData.isActive &&
                    <Button to='#' onClick={handleDeactivateAccount} primary>
                        Deactivate
                    </Button>
                    }
                    {!accountFormData.isActive &&
                    <Button to='#' onClick={handleReactivateAccount} primary>
                        Reactivate
                    </Button>
                    }
                </DialogActions>
        </Dialog>
        <Dialog fullWidth open={isUpgradeDialogOpen} onClose={handleCloseUpgradeDialog} aria-labelledby="toggle-dialog">

                <DialogTitle id="toggle-dialog-title">
                    Are you sure of <strong>{ getDialogKeyword() }</strong> {accountFormData.name}'s account?
                </DialogTitle>
                <DialogContent>
                    { accountFormData.isAdmin &&  <>User will no longer be an admin.</> }
                    { !accountFormData.isAdmin &&  <>User will be an admin.</> }
                </DialogContent>
                <br/>
                <DialogActions>
                    <Button to= '#' onClick={handleCloseUpgradeDialog}>
                        Cancel
                    </Button>
                    {accountFormData.isAdmin &&
                    <Button to='#' onClick={handleDowngrade} primary>
                        Downgrade
                    </Button>
                    }
                    {!accountFormData.isAdmin &&
                    <Button to='#' onClick={handleUpgrade} primary>
                        Upgrade
                    </Button>
                    }
                </DialogActions>
        </Dialog>
        </>
    )
}

export default withRouter(ViewUserDetails);
