import React, { useState, useEffect, useReducer } from 'react'
import { withRouter, useHistory } from 'react-router-dom';
import { getCourseByCourseId, toggleEnrollmentActiveStatus, updateCourse } from './../../../apis/Course/CourseApis';
import { Tag } from "../../../apis/Entities/Tag";
import { UpdateCourseReq, Course } from "../../../apis/Entities/Course";
import { Lesson } from "../../../apis/Entities/Lesson";
import { Multimedia } from "../../../apis/Entities/Multimedia"
import { getAllTags } from '../../../apis/Tag/TagApis';
import { Button } from "../../../values/ButtonElements";


import { CourseDetailsContainer, HeadingWrapper, CourseDetailsEditContainer, DetailsCard, DetailsWrapper, CardTitle, CardDescription, RowTitle, CardLine, BtnWrapper } from "./ViewCourseDetailsElements"
import { Autocomplete } from "@material-ui/lab";
import { Box, Grid, TextField, Chip, InputAdornment, IconButton, Dialog, DialogTitle, DialogActions, DialogContent} from "@material-ui/core";

const formReducer = (state: any, event: any) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function ViewCourseDetails(props: any) {
    const courseId = props.match.params.courseId;
    const [courseFormData, setCourseFormData] = useReducer(formReducer, {});
    const [loading, setLoading] = useState<boolean>(true);
    const [tagLibrary, setTagLibrary] = useState<Tag[]>([]);
    const [bannerImageFile, setBannerImageFile] = useState<File>(new File([""], ""));
    const [isToggleActiveEnrollmentDialogOpen, setIsToggleActiveEnrollmentDialogOpen] = useState<boolean>(false);
    

    useEffect(() => {
        setLoading(true)
        getCourseByCourseId(courseId).then((receivedCourse: Course) => {
            Object.keys(receivedCourse).map((key, index) => {
                let wrapperEvent = {
                    target: {
                        name: key,
                        value: Object.values(receivedCourse)[index]
                    }
                }
                handleFormDataChange(wrapperEvent)
            }) 
        });
      }, [courseId]);

      console.log(courseFormData.courseTags)

    useEffect(() => {
        getAllTags().then((res: any)=> setTagLibrary(res)).catch(() => console.log("error getting tags."))
        setLoading(false)
    }, [])

    const handleChipInputChange = (e: object, value: String[], reason: string) => {
        let wrapperEvent = {
            target: {
                name: "courseTags",
                value: value.map((tagTitle: String) => { return { title: tagTitle }})
            }
        }
        return handleFormDataChange(wrapperEvent);
    }

    const handleFormDataChange = (event: any) => {
        setCourseFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const buildUpdateCourseReq = (courseFormData: any) => {
        const updatedCourse = {
            name: courseFormData.name,
            description: courseFormData.description,
            price: courseFormData.price,
            courseId: courseFormData.courseId,
            bannerUrl: bannerImageFile.size === 0 ? courseFormData.bannerUrl : ""
        }

        const updatedCourseTagTitles = courseFormData.courseTags.map((tag: Tag) => tag.title)

        const updatedLessonReqs = courseFormData.lessons.map((lesson: Lesson) => {
            return {
                lesson: lesson,
                quizzes: lesson.quizzes,
                multimediaReqs: lesson.multimedias.map((multimedia: Multimedia) => {
                    return {
                        multimedia: multimedia,
                        multipartFile: multimedia.file
                    }
                })
            }
        })

        // @ts-ignore
        const updateCourseReq: UpdateCourseReq = { course: updatedCourse, courseTagTitles: updatedCourseTagTitles, updateLessonReqs: updatedLessonReqs }
        return updateCourseReq
    }

    const handleUpdateCourse = () => {
    
        const updateCourseReq = buildUpdateCourseReq(courseFormData)

        updateCourse(updateCourseReq, bannerImageFile).then((updatedCourse) => {
            console.log(updatedCourse);

            setCourseFormData(updatedCourse)

            window.location.reload();
        })
    }
    
    return (
        <CourseDetailsContainer>
            <HeadingWrapper>{courseFormData.name}</HeadingWrapper>
            <DetailsCard>
                <DetailsWrapper>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription></CardDescription>
                    <RowTitle>Course Name</RowTitle>
                    <CardDescription>{courseFormData.name}</CardDescription>
                    <RowTitle>Course Description</RowTitle>
                    <CardDescription>{courseFormData.description}</CardDescription>
                    <RowTitle>Price</RowTitle>
                    <CardDescription>$ {courseFormData.price}</CardDescription>
                    <RowTitle>Tags</RowTitle>
                    {courseFormData.courseTags &&
                    <Autocomplete
                                multiple
                                options={tagLibrary.map((option) => option.title)}
                                defaultValue={courseFormData.courseTags.map((tag: Tag) => tag.title)}
                                onChange={handleChipInputChange}
                                freeSolo
                                renderTags={(value: string[], getTagProps) =>
                                    value.map((option: string, index: number) => (
                                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                    ))}
                                renderInput={(params) => (
                                    <TextField {...params} id="standard-basic" label="Add/Delete Tags from Course"/>
                                )}/>
                    }          
                </DetailsWrapper>
            </DetailsCard>
            <BtnWrapper>
                <Button primary onClick={handleUpdateCourse} to='#'>Update Course</Button>
            </BtnWrapper>
        </CourseDetailsContainer>
    )
}

export default withRouter(ViewCourseDetails);
