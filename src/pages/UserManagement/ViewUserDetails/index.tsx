import { useState, useEffect, useReducer } from 'react'
import { withRouter } from 'react-router-dom';
import { getAccountByAccountId } from './../../../apis/Account/AccountApis';
import { Account } from "../../../apis/Entities/Account";

import { UserDetailsContainer, HeadingWrapper, DetailsCard, DetailsWrapper, CardTitle, CardDescription, RowTitle, ChipWrapper } from "./ViewUserDetailsElements"
import { Chip, } from "@material-ui/core";
import EnrolledCoursesTable from "./EnrolledCoursesTable/EnrolledCoursesTable";
import TutoringCoursesTable from "./TutoringCoursesTable/TutoringCoursesTable";

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

    return (
        <>
        <UserDetailsContainer>
            <HeadingWrapper>
                User Profile
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
                </DetailsWrapper>
            </DetailsCard>
        </UserDetailsContainer>
        <EnrolledCoursesTable account={accountId}/>
        <TutoringCoursesTable account={accountId}/>
        </>
    )
}

export default withRouter(ViewUserDetails);
