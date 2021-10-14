import React, { useEffect, useState } from 'react'
import { Account } from "../../../apis/Entities/Account"
import { TutorAndEarningsResp } from '../../../apis/Entities/Transaction'
import { getAllTutors } from "../../../apis/Account/AccountApis"
import { getAllTutorsWithEarnings } from "../../../apis/Transaction/TransactionApis"
import { UserEarningsContainer, HeadingWrapper, SubHeadingWrapper, DataGridContainer, BtnWrapper, MessageContainer, } from "./UserEarningsElements"
import { Button } from "../../../values/ButtonElements";

import { DataGrid, GridToolbar, GridColDef, GridValueGetterParams, GridSelectionModel  } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'name',
        headerName: 'Tutor Name',
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
        field: 'earnings',
        headerName: 'Lifetime Earnings ($)',
        width: 400,
    },
];

function UserEarnings() {
    const [accounts, setAccounts] = useState<TutorAndEarningsResp[]>([]);
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

    useEffect(() => {
        getAllTutorsWithEarnings().then(allTutors => {
            setAccounts(allTutors);
        })
    }, [])

    var accountId: number = +(selectionModel[0])

    var data = accounts?.map((account) => {
        return {
            id: account.accountId,
            name: account.tutorName,
            username: account.username,
            email: account.email,
            earnings: account.earnings,
            }
    });

    console.log(data);

    return (
        <UserEarningsContainer>
            <HeadingWrapper>Tutors</HeadingWrapper>
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
                    <Button primary to={`/finance/users/${accountId}`}>View Insights</Button>
                }
            </BtnWrapper>
        </UserEarningsContainer>
    )
}

export default UserEarnings
