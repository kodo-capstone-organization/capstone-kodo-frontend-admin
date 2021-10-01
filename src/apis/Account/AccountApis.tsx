import { IHttpClientRequestParameters } from "./../HttpClient/IHttpClientRequestParameters";
import { LoginResponse } from "../Entities/Login";
import { Account, CreateNewAccountReq, UpdateAccountReq, UpdateAccountPasswordReq } from "../Entities/Account";
import { DeactivateAccountResponse } from "../Entities/Deactivate";
import { httpClient } from "../HttpClient/HttpClient";
import { transformToBlob } from "../../utils/BlobCreator";
const FormData = require('form-data');

export async function getMyAccount(accountId: number): Promise<Account> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/account/getAccountByAccountId/${accountId}`
    }

    return httpClient.get<undefined, Account>(getParameters);
}

export async function downgradeAccount(accountId: number): Promise<Account> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/account/downgradeAccount/${accountId}`
    }

    return httpClient.get<undefined, Account>(getParameters);
}

export async function upgradeAccount(accountId: number): Promise<Account> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/account/upgradeAccount/${accountId}`
    }

    return httpClient.get<undefined, Account>(getParameters);
}

export async function adminLogin(username: string, password: string): Promise<LoginResponse> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const postParameters: IHttpClientRequestParameters<FormData> = {
        url: '/account/adminLogin',
        payload: formData
    }

    return httpClient.post<FormData, LoginResponse>(postParameters)
}

export async function getAllAccounts(): Promise<Account[]> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: '/account/getAllAccounts'
    }

    return httpClient.get<undefined, Account[]>(getParameters)
}

export async function getAccountByAccountId(accountId: number): Promise<Account> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/account/getAccountByAccountId/${accountId}`
    }

    return httpClient.get<undefined, Account>(getParameters);
}

export async function deactivateAccount(deactivatingAccountId: number, requestingAccountId: number): Promise<DeactivateAccountResponse> {
    const deleteParameters: IHttpClientRequestParameters<undefined> = {
        url: `/account/deactivateAccount/${deactivatingAccountId}&${requestingAccountId}`
    }

    return httpClient.delete<undefined, DeactivateAccountResponse>(deleteParameters);
}

export async function reactivateAccount(reactivatingAccountId: number, requestingAccountId: number): Promise<DeactivateAccountResponse> {
    const deleteParameters: IHttpClientRequestParameters<undefined> = {
        url: `/account/reactivateAccount/${reactivatingAccountId}&${requestingAccountId}`
    }

    return httpClient.delete<undefined, DeactivateAccountResponse>(deleteParameters);
}

export async function createNewAccount(createNewAccountReq: CreateNewAccountReq, displayPicture: File | null): Promise<Account> {
    const formData = new FormData();

    formData.append('account', transformToBlob(createNewAccountReq));
    if (displayPicture !== null)
    {
        formData.append('displayPicture', displayPicture);
    }

    const postParameters: IHttpClientRequestParameters<FormData> = {
        url: '/account/createNewAccount',
        payload: formData
    }

    return httpClient.post<FormData, Account>(postParameters)
}

export async function getAllAccountsWithoutEnrollment(): Promise<Account[]> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: '/account/getAllAccountsWithoutEnrollment'
    }

    return httpClient.get<undefined, Account[]>(getParameters)
}