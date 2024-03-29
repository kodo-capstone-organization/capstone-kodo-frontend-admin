import React, { useEffect, useState } from 'react'
import { Course } from "../../../entities/Course"
import { getAllCourses } from "../../../apis/CourseApis"
import { CourseEarningsContainer, HeadingWrapper, SubHeadingWrapper, DataGridContainer, BtnWrapper, MessageContainer,  } from "./CourseEarningsElements"
import { Button } from "../../../values/ButtonElements";

import { DataGrid, GridToolbar, GridColDef, GridValueGetterParams, GridSelectionModel  } from '@mui/x-data-grid';

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

const CourseFinanceList = (props: any) => {

    const [courses, setCourses] = useState<Course[]>();
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
            tutorName: course.tutorName,
            status: findStatus(course),
            numEnrolled: course.enrollmentLength,
            courseRating: Math.round(course.courseRating),
        }
    });

    var courseId: number = +(selectionModel[0])
    console.log(selectionModel)
    console.log(typeof(courseId))

    return (
        <CourseEarningsContainer>
            <HeadingWrapper>Courses</HeadingWrapper>
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
                <Button primary to={`/finance/courses/${courseId}`}>View Insights</Button>
                }
            </BtnWrapper>
        </CourseEarningsContainer>
    )
}

export default CourseFinanceList
