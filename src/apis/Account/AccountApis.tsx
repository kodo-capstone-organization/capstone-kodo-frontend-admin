import { IHttpClientRequestParameters } from "./../HttpClient/IHttpClientRequestParameters";
import { LoginResponse } from "../Entities/Login";
import { Account} from "../Entities/Account";
import { httpClient } from "../HttpClient/HttpClient";

export async function getMyAccount(accountId: number): Promise<Account> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/account/getAccountByAccountId/${accountId}`
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
