import Typography from "@material-ui/core/Typography";
import { useState, useEffect } from "react";
import { Course } from "../../../entities/Course";

import { CourseListContainer, BlankStateContainer, HeadingWrapper } from "../ViewCourseList/ViewCoursesElements"
import ViewCourseList from "../ViewCourseList";

function CourseManagementTabPanel(props: any) {
    const [curTabIdx, setCurTabIdx] = useState<number>(0);
    // const [curMyName, setMyTabName] = useState<string>("");
    const [myTabIdx, setMyTabIdx] = useState<number>(0);
    const [courseList, setCourseList] = useState<Course[]>([]);
    const [courseType, setCourseType] = useState<string>("");

    useEffect(() => {
        setCurTabIdx(props.curTabIdx);
        // setMyTabName(props.myTabName);
        setMyTabIdx(props.myTabIdx);
        setCourseList(props.courseList);
        setCourseType(props.courseType);
    }, [props.curTabIdx, props.curTabName, props.myTabIdx, props.courseList, props.courseType])

    return (
        <>
        { curTabIdx === myTabIdx &&
            <div role="tabpanel">
                { (courseList === undefined || courseList.length === 0 || courseType === "") &&
                    <>
                        <BlankStateContainer>
                            <Typography>Uh oh. No courses to be found 🔍</Typography>
                            <br/>
                        </BlankStateContainer>
                    </>
                }
                { courseList && courseList.length !== 0 &&
                    <CourseListContainer>
                        <ViewCourseList courses={courseList} courseType={courseType} />
                    </CourseListContainer>
                }


            </div>
        }
    </>
    )
}

export default CourseManagementTabPanel
