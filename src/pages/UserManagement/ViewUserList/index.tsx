import React, { useState, useEffect } from 'react'
import { getMyAccount, getAllAccounts } from "../../../apis/Account/AccountApis";
import { Account } from "../../../apis/Entities/Account";

import { UserListContainer, HeadingWrapper, DataGridContainer, BtnWrapper } from "./ViewUserElements";
import { Button } from "../../../values/ButtonElements";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DataGrid, GridToolbar, GridColDef, GridValueGetterParams, GridSelectionModel } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

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
    }
];

function ViewUserList() {
    const [accounts, setAccounts] = useState<Account[]>();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [loading, setLoading] = useState<Boolean>(true);
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

    useEffect(() => {
        setLoading(true);
        getAllAccounts().then(allAccounts => {
            setAccounts(allAccounts);
        });
        setLoading(false);
    }, []);

    var data = accounts?.map((account) => {
        return {
            id: account.accountId,
            name: account.name,
            username: account.username,
            email: account.email
        }
    });

    var accountId: number = +(selectionModel[0])

    return (
        <UserListContainer>
            <HeadingWrapper>
                Users
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
                    <Button disabled></Button>
                }
                {selectionModel.length > 0 &&
                    <Button primary to={`/viewuser/manageuser/${accountId}`}>View Details</Button>
                }
            </BtnWrapper>
        </UserListContainer>
    )
}

export default ViewUserList
