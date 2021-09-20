import React, { useState, useEffect } from 'react'
import { Course } from "../../../../apis/Entities/Course";
import { getAllCourses, getCourseByCourseId } from "../../../../apis/Course/CourseApis"
import { CourseListContainer, HeadingWrapper, DataGridContainer, BtnWrapper } from "./EnrolledStudentsElements";
import { Button } from "../../../../values/ButtonElements";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DataGrid, GridToolbar, GridColDef, GridValueGetterParams, GridSelectionModel  } from '@mui/x-data-grid';
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
      field: 'status',
      headerName: 'Status',
      type: 'boolean',
      width: 200,
    },
    {
        field: 'dateOfCompletion',
        headerName: 'Date Of Completion',
        type: 'Date',
        width: 200,
    },
  ];

function EnrolledStudentsTable(props: any) {
    const courseId = props.course;
    const [course, setCourse] = useState<Course>();

    useEffect(() => {
        getCourseByCourseId(courseId).then(receivedCourse => {
            setCourse(receivedCourse);
          });
      }, [courseId]);

      console.log(course?.enrollment)

    return (
        <div>
            <h1>table for {course?.name} goes here</h1>
        </div>
    )
}

export default EnrolledStudentsTable
