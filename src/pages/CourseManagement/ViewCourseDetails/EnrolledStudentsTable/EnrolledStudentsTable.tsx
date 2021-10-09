import React, { useState, useEffect } from 'react'
import { Course } from "../../../../apis/Entities/Course";
import { EnrolledCourseWithStudentCompletion } from "../../../../apis/Entities/EnrolledCourse"
import { getAllCourses, getCourseByCourseId } from "../../../../apis/Course/CourseApis"
import { getEnrolledCoursesWithStudents } from "../../../../apis/EnrolledCourse/EnrolledCourseApis";
import { CourseListContainer, HeadingWrapper, DataGridContainer, BtnWrapper } from "./EnrolledStudentsElements";
import { Button } from "../../../../values/ButtonElements";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DataGrid, GridToolbar, GridColDef, GridValueGetterParams, GridSelectionModel  } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const columns: GridColDef[] = [
    { field: 'studentId', headerName: 'ID', width: 90 },
    {
      field: 'studentName',
      headerName: 'Name',
      width: 250,
    },
    {
      field: 'studentUsername',
      headerName: 'Username',
      width: 150,
    },
    {
      field: 'studentActive',
      headerName: 'Active Status',
      type: 'boolean',
      width: 200,
    },
    {
        field: 'completionDate',
        headerName: 'Date Of Completion',
        width: 400,
    },
  ];

function EnrolledStudentsTable(props: any) {
    const courseId = props.course;
    const [students, setStudents] = useState<EnrolledCourseWithStudentCompletion[]>();

    useEffect(() => {
      getEnrolledCoursesWithStudents(courseId).then(receivedStudents => {
            setStudents(receivedStudents);
          });
      }, [courseId]);

      
    const formatDate = (date: Date) => {
      var d = new Date(date);
      return d.toDateString() + ', ' + d.toLocaleTimeString();
    }

      var data = students?.map((student) => {
        return {
          studentId: student.studentId,
            studentName: student.studentName,
            studentUsername: '@'+student.studentUsername,
            studentActive: student.studentActive,
            completionDate: student.completionDate != null ? formatDate(student.completionDate) : "In Progress",
        }
    });

    return (
        <div>
            <CourseListContainer>
            <HeadingWrapper>
                Enrolled Students
            </HeadingWrapper>
            <DataGridContainer>
            {data &&
            <DataGrid
                getRowId={(row) => row.studentId}
                rows={data}
                columns={columns}
            />
            }
            </DataGridContainer>
        </CourseListContainer>
        </div>
    )
}

export default EnrolledStudentsTable
