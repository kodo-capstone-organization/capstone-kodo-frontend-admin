import React, { useState, useEffect } from 'react'
import { EnrolledCoursesContainer, HeadingWrapper, DataGridContainer, } from "./EnrolledCoursesElements";

import { DataGrid, GridToolbar, GridColDef, GridValueGetterParams, GridSelectionModel } from '@mui/x-data-grid';
import { Account } from '../../../../apis/Entities/Account';
import { getAccountByAccountId } from '../../../../apis/Account/AccountApis';

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

function EnrolledCoursesTable(props: any) {
  const accountId = props.account;
  const [account, setAccount] = useState<Account>();

  useEffect(() => {
    getAccountByAccountId(accountId).then(receivedAccount => {
      setAccount(receivedAccount);
    });
  }, [accountId]);
  
  var data = account?.enrolledCourses.map((enrolledCourseToLoop) => {
    return {
      id: enrolledCourseToLoop.parentCourse.courseId,
      courseName: enrolledCourseToLoop.parentCourse.name,
      rating: enrolledCourseToLoop.courseRating
    }
  });

  return (
    <EnrolledCoursesContainer>
      <HeadingWrapper>
        Enrolled Courses
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
    </EnrolledCoursesContainer>
  )
}

export default EnrolledCoursesTable
