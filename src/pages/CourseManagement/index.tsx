import React, {useState, useEffect} from 'react'
import { Course } from "../../entities/Course";
import { getAllCourses, getPendingCourses } from '../../apis/CourseApis';
import CourseManagementTabPanel from './components/CourseManagementTabPanel'
import Paper from '@material-ui/core/Paper';
import { HeadingWrapper, MessageContainer, CourseListContainer } from './ViewCourseList/ViewCoursesElements';
import { 
    Chip,
    Tab, 
    Tabs, 
    TextField,
    CircularProgress
  } from "@material-ui/core";
import { colours } from "../../values/Colours";


const CourseManagement = () => {
    const [tab, setTab] = useState<number>(0);
    const [loading, setLoading] = useState<Boolean>(true);
    const [courses, setCourses] = useState<Course[]>();
    const [pendingCourses, setPendingCourses] = useState<Course[]>();

    useEffect(() => {
        setLoading(true);
        getAllCourses().then(allCourses => {
          setCourses(allCourses);
        });
        getPendingCourses().then((res) => {
            setPendingCourses(res);
        })
        setLoading(false);
      }, []);

      const getTabItems = () => {
        return [
          {
            myTabIdx: 0,
            myTabName: "All Courses",
            courseList: courses,
            courseType: "Courses"
          },
          {
            myTabIdx: 1,
            myTabName: "Pending For Approval",
            courseList: pendingCourses,
            courseType: "Pending"
          },
          
        ];
      };

      const handleTabChange = (event: any, newTabIndex: number) => {
        setTab(newTabIndex);
      };
   
    return (
        loading ? <MessageContainer><CircularProgress /></MessageContainer> :
        <CourseListContainer>
        <Paper square>
        <Tabs
          value={tab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleTabChange}
          centered
          style={{ backgroundColor: colours.GRAY7, marginBottom: "1.5rem" }}
        >
          {getTabItems().map(tabItem => (
            <Tab
              key={tabItem.myTabIdx}
              label={tabItem.myTabName}
              style={{ minWidth: "25%"}}
            />
          ))}
        </Tabs>
        </Paper>
        <div id="browse-course-panel-group">
          {getTabItems().map(tabItem => (
            <CourseManagementTabPanel
              curTabIdx={tab}
              key={tabItem.myTabIdx}
              myTabIdx={tabItem.myTabIdx}
              myTabName={tabItem.myTabName}
              courseList={tabItem.courseList}
              courseType={tabItem.courseType}
            />
          ))}
        </div>
        </CourseListContainer>
    )
}

export default CourseManagement
