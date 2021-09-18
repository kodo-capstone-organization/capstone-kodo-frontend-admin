import React, { useState, useEffect } from 'react'
import { Course } from "../../../apis/Entities/Course";
import { getAllCourses } from "../../../apis/Course/CourseApis"
import { CourseListContainer, HeadingWrapper, DataGridContainer, BtnWrapper } from "./ViewCoursesElements";
import { Button } from "../../../values/ButtonElements";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DataGrid, GridToolbar, GridColDef, GridValueGetterParams, GridSelectionModel  } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Course name',
      width: 250,
    },
    {
      field: 'tutorName',
      headerName: 'Tutor name',
      width: 150,
    },
    {
      field: 'activeEnrollment',
      headerName: 'Active Enrollment',
      type: 'boolean',
      width: 200,
    },
    {
        field: 'numEnrolled',
        headerName: 'No. Enrolled',
        type: 'number',
        width: 200,
    },
    {
        field: 'courseRating',
        headerName: 'Rating',
        type: 'number',
        width: 200,
    },
  ];

function ViewCourseList() {
    const [courses, setCourses] = useState<Course[]>();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [loading, setLoading] = useState<Boolean>(true);
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);


    useEffect(() => {
        setLoading(true);
        getAllCourses().then(allCourses => {
          setCourses(allCourses);
        });
        setLoading(false);
      }, []);

      console.log(courses)

      interface CourseCustom{
        id: number;
        name: string,
        tutorName: string,
        activeEnrollment: boolean,
        numEnrolled: number,
        courseRating: number,
      }

      var data = courses?.map((course) => {
        return {
            id: course.courseId,
            name: course.name,
            tutorName: course.tutor.name,
            activeEnrollment: course.isEnrollmentActive,
            numEnrolled: course.enrollment.length,
            courseRating: Math.round(course.courseRating),
        }
    });

    var courseId: number = +(selectionModel[0])
    console.log(selectionModel)
    console.log(typeof(courseId))


    return (
        <CourseListContainer>
            <HeadingWrapper>
                Courses
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
                <Button disabled>View Details</Button>
                }
                {selectionModel.length > 0 &&
                <Button primary to={`/viewcourse/managecourses/${courseId}`}>View Details</Button>
                }
            </BtnWrapper>
        </CourseListContainer>
    )
}

export default ViewCourseList
