import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom';
import { getCourseByCourseId, toggleEnrollmentActiveStatus } from './../../../apis/Course/CourseApis';
import { Tag } from "../../../apis/Entities/Tag";
import { UpdateCourseReq, Course } from "../../../apis/Entities/Course";
import { Lesson } from "../../../apis/Entities/Lesson";
import { Multimedia } from "../../../apis/Entities/Multimedia"
import { getAllTags } from '../../../apis/Tag/TagApis';
import { Button } from "../../../values/ButtonElements";


import { CourseDetailsContainer, HeadingWrapper, CourseDetailsCard, CourseDetailsCardHeader, CourseDetailsContent, CourseDetailsEditContainer } from "./ViewCourseDetailsElements"
import {
    useAutocomplete,
    AutocompleteGetTagProps,
  } from '@mui/core/AutocompleteUnstyled';
  import CheckIcon from '@mui/icons-material/Check';
  import CloseIcon from '@mui/icons-material/Close';
  import { styled } from '@mui/material/styles';


function ViewCourseDetails(props: any) {

    const history = useHistory();
    const courseId = props.match.params.courseId;
    const [course, setCourse] = useState<Course>();
    const [loading, setLoading] = useState<boolean>(true);
    const [tagLibrary, setTagLibrary] = useState<Tag[]>([]);
    const [isToggleActiveEnrollmentDialogOpen, setIsToggleActiveEnrollmentDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        getCourseByCourseId(courseId).then(receivedCourse => {
            setCourse(receivedCourse);
            setLoading(false);
        });
    }, [courseId])

    console.log(course);

    return (
        <CourseDetailsContainer>
            <HeadingWrapper>{course?.name}</HeadingWrapper>
            <CourseDetailsContent>
            </CourseDetailsContent>
        </CourseDetailsContainer>
    )
}

export default withRouter(ViewCourseDetails);
