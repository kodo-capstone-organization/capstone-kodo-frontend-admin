import { IHttpClientRequestParameters } from "./../HttpClient/IHttpClientRequestParameters";
import { Account} from "../Entities/Account";
import { httpClient } from "../HttpClient/HttpClient";

export async function getMyAccount(accountId: number): Promise<Account> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/account/getAccountByAccountId/${accountId}`
    }

    return httpClient.get<undefined, Account>(getParameters);
}