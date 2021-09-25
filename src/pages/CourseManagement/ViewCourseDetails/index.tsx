import { useState, useEffect, useReducer } from 'react'
import { withRouter, useHistory } from 'react-router-dom';
import { getCourseByCourseId, toggleEnrollmentActiveStatus, updateCourse } from './../../../apis/Course/CourseApis';
import { Tag } from "../../../apis/Entities/Tag";
import { UpdateCourseReq, Course } from "../../../apis/Entities/Course";
import { Lesson } from "../../../apis/Entities/Lesson";
import { Multimedia } from "../../../apis/Entities/Multimedia"
import { getAllTags } from '../../../apis/Tag/TagApis';
import { Button } from "../../../values/ButtonElements";
import { Button as DeleteButton } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import EnrolledStudentsTable from './EnrolledStudentsTable/EnrolledStudentsTable';

import { CourseDetailsContainer, HeadingWrapper, DetailsCard, DetailsWrapper, CardTitle, CardDescription, RowTitle, BtnWrapper, } from "./ViewCourseDetailsElements"
import { Autocomplete } from "@material-ui/lab";
import { TextField, Chip, Dialog, DialogTitle, DialogActions, DialogContent, } from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PanToolIcon from '@material-ui/icons/PanTool';

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
    const [checked, setChecked] = useState<boolean>(true);
    const history = useHistory();

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

      console.log(courseFormData)

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

    const handleOpenToggleEnrollmentDialog = () => {
        setIsToggleActiveEnrollmentDialogOpen(true)
    }

    const handleCloseToggleEnrollmentDialog = () => {
        setIsToggleActiveEnrollmentDialogOpen(false)
    }
    
    const handleToggleConfirmation = () => {
        const myAccountId = window.sessionStorage.getItem("loggedInAccountId")
        
        if (myAccountId !== null)
        {
            toggleEnrollmentActiveStatus(courseFormData.courseId, parseInt(myAccountId)).then((res: any) => {
                // Toggle success, refresh page
                console.log(res);
                window.location.reload();
            }).catch(error => {
                console.log("Error in deletion", error)
            });
        }
        else
        {
            // No account ID found in local storage. Redirect to login
            history.push('/login')
        }
    }

    const  getToggleKeyword = () => {
        return courseFormData.isEnrollmentActive ? "Pause" : "Resume"
    }

    return (
        <CourseDetailsContainer>
            <HeadingWrapper>
                {courseFormData.name}
                <DeleteButton color={courseFormData.isEnrollmentActive ? "secondary" : "primary"} onClick={handleOpenToggleEnrollmentDialog}>
                    {courseFormData.isEnrollmentActive && <><PanToolIcon /> &nbsp; Unpublish Course</>}
                    {!courseFormData.isEnrollmentActive && <><PlayArrowIcon /> &nbsp; Publish Course</>}
                </DeleteButton>
            </HeadingWrapper>
            <DetailsCard>
                <DetailsWrapper>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription></CardDescription>
                    <RowTitle>Course Name</RowTitle>
                    <CardDescription>{courseFormData.name}</CardDescription>
                    <RowTitle>Course Description</RowTitle>
                    <CardDescription>{courseFormData.description}</CardDescription>
                    <RowTitle>Rating</RowTitle>
                    <Rating name="read-only" value={Math.round(courseFormData.courseRating)} readOnly />
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
            <EnrolledStudentsTable course={courseId}/>
            <Dialog fullWidth open={isToggleActiveEnrollmentDialogOpen} onClose={handleCloseToggleEnrollmentDialog} aria-labelledby="toggle-dialog">

                <DialogTitle id="toggle-dialog-title">
                    { getToggleKeyword() } Enrollment for {courseFormData.name}?
                </DialogTitle>
                <DialogContent>
                    { courseFormData.isEnrollmentActive &&  <>Users will not be able to enroll in this course. Existing enrolled users will still be able to read your course materials.</> }
                    { !courseFormData.isEnrollmentActive &&  <>Users will be able to enroll in this course again.</> }
                </DialogContent>
                <br/>
                <DialogActions>
                    <Button to= '#' onClick={handleCloseToggleEnrollmentDialog}>
                        Cancel
                    </Button>
                    <Button to='#' onClick={handleToggleConfirmation} primary>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </CourseDetailsContainer>
    )
}

export default withRouter(ViewCourseDetails);
