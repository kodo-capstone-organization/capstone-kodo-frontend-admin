import React, { useState, useEffect } from 'react'
import { TutoringCoursesContainer, HeadingWrapper, DataGridContainer, } from "./TutoringCoursesElements";

import { DataGrid, GridToolbar, GridColDef, GridValueGetterParams, GridSelectionModel } from '@mui/x-data-grid';
import { Account } from '../../../../entities/Account';
import { getAccountByAccountId } from '../../../../apis/AccountApis';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Course ID',
    width: 150,
  },
  {
    field: 'courseName',
    headerName: 'Course Name',
    width: 350,
  },
  {
    field: 'rating',
    headerName: 'Rating',
    width: 250,
  },
];

function TutoringCoursesTable(props: any) {
  const accountId = props.account;
  const [account, setAccount] = useState<Account>();

  useEffect(() => {
    getAccountByAccountId(accountId).then(receivedAccount => {
      setAccount(receivedAccount);
    });
  }, [accountId]);

  var data = account?.courses.map((courseToLoop) => {
    return {
      id: courseToLoop.courseId,
      courseName: courseToLoop.name,
      rating: courseToLoop.courseRating
    }
  });

  return (
    <TutoringCoursesContainer>
      <HeadingWrapper>
        Tutoring Courses
      </HeadingWrapper>
      <DataGridContainer>
        {data &&
          <DataGrid
            getRowId={(row) => row.id}
            rows={data}
            columns={columns}
          />
        }
      </DataGridContainer>
    </TutoringCoursesContainer>
  )
}

export default TutoringCoursesTable
