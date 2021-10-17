import React, { useState, useEffect } from 'react'
import { Course } from "../../../apis/Entities/Course";
import { getAllCourses } from "../../../apis/Course/CourseApis"
import { CourseListContainer, HeadingWrapper, DataGridContainer, BtnWrapper, ForumButton } from "./ViewCoursesElements";
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
      field: 'status',
      headerName: 'Status',
      type: 'string',
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

function ViewCourseList(props: any) {
    const [courses, setCourses] = useState<Course[]>([...props.courses]);
    const [courseType, setCourseType] = useState<string>(props.courseType);
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);


    useEffect(() => {
        setCourses(props.courses);
        setCourseType(props.courseType);
      }, [props]);

      console.log(courses)

      const findStatus = (course: Course) => {
        if (course.isEnrollmentActive && course.isEnrollmentActive) {
          return "Approved"
        } else if (course.isReviewRequested && !course.isEnrollmentActive) {
          return "Pending Approval"
        } else if (!course.isReviewRequested && !course.isEnrollmentActive) {
          return "Rejected"
        }
      }

      var data = courses?.map((course) => {
        return {
            id: course.courseId,
            name: course.name,
            tutorName: course.tutor.name,
            status: findStatus(course),
            numEnrolled: course.enrollmentLength,
            courseRating: Math.round(course.courseRating),
        }
    });

    var courseId: number = +(selectionModel[0])
    console.log(selectionModel)
    console.log(typeof(courseId))


    return (
      <>
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
                {selectionModel.length === 0 && courseType !== "Pending" &&
                <Button disabled><ForumButton style={{'fontSize': 'medium'}} />View Forum</Button>
                }
                {selectionModel.length > 0 && courseType !== "Pending" &&
                <Button primary to={`/viewcourse/forum/${courseId}`}><ForumButton style={{'fontSize': 'medium'}} />View Forum</Button>
                }
            </BtnWrapper>
      </>      
    )
}

export default ViewCourseList
