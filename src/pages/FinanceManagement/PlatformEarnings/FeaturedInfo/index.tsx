import React, { useState, useEffect } from 'react'
import { PlatformEarningsResp } from "../../../../apis/Entities/Transaction";
import { MONTHSFULL } from "../../../../values/DateTime";
import { 
    Featured, 
    FeaturedIconDownward, 
    FeaturedIconUpward, 
    FeaturedItem, 
    FeaturedMoney, 
    FeaturedMoneyContainer, 
    FeaturedMoneyRate, 
    FeaturedSub, 
    FeaturedTitle,
    MessageContainer,
    CourseIcon,
    TutorIcon,
    TooltipWrapper
} from "../../FeaturedInfo";
import {
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    DialogTitle,
    Dialog,
    IconButton,
    Tooltip
} from '@material-ui/core';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';


const FeaturedInfo = (props: any) => {
    const [platformEarnings, setPlatformEarnings] = useState<PlatformEarningsResp>(props.platformEarnings);
    const [openLCDialog, setOpenLCDialog] = useState<boolean>(false);
    const [openLTDialog, setOpenLTDialog] = useState<boolean>(false);
    const [openMCDialog, setOpenMCDialog] = useState<boolean>(false);
    const [openMTDialog, setOpenMTDialog] = useState<boolean>(false);

    useEffect(() => {
        setPlatformEarnings(props.platformEarnings);
    }, [props.platformEarnings]);

    const openLifetimeCourseDialog = () => {
        setOpenLCDialog(true);
        console.log("course dialog")
    }

    const openLifetimeTutorDialog = () => {
        setOpenLTDialog(true);
        console.log("tutor dialog")
    }

    const openMonthCourseDialog = () => {
        setOpenMCDialog(true);
        console.log("course month dialog")
    }

    const openMonthTutorDialog = () => {
        setOpenMTDialog(true);
        console.log("tutor month dialog")
    }

    const handleCloseDialog = () => {
        setOpenLCDialog(false);
        setOpenLTDialog(false);
        setOpenMCDialog(false);
        setOpenMTDialog(false);
    }

    const getCurrentMonth = () => {
        const curDate = new Date();
        const curMonthNum = curDate.getMonth();
        return `${MONTHSFULL[curMonthNum]}`
    }

    return (
        <>
        <Featured>
            <FeaturedItem onClick={openLifetimeCourseDialog}>
                <TooltipWrapper>
                    <Tooltip title="Click to see more">
                        <IconButton aria-label="Click to see more">
                            <InfoRoundedIcon style={{ 'color': '#323940', 'width': '20px', }} />
                        </IconButton>
                    </Tooltip>
                </TooltipWrapper>
                <FeaturedTitle>Highest Earning Courses</FeaturedTitle>
                <FeaturedSub>Lifetime</FeaturedSub>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>{platformEarnings?.lifetimeHighestEarningCourses[0].name}</FeaturedMoney>
                </FeaturedMoneyContainer>
            </FeaturedItem>
            <FeaturedItem onClick={openLifetimeTutorDialog}>
                <TooltipWrapper>
                    <Tooltip title="Click to see more">
                        <IconButton aria-label="Click to see more">
                            <InfoRoundedIcon style={{ 'color': '#323940', 'width': '20px', }} />
                        </IconButton>
                    </Tooltip>
                </TooltipWrapper>
                <FeaturedTitle>Highest Earning  Tutors</FeaturedTitle>
                <FeaturedSub>Lifetime</FeaturedSub>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>{platformEarnings?.lifetimeHighestEarningTutors[0].name}</FeaturedMoney>
                </FeaturedMoneyContainer>
            </FeaturedItem>
            <FeaturedItem onClick={openMonthCourseDialog}>
                <TooltipWrapper>
                    <Tooltip title="Click to see more">
                        <IconButton aria-label="Click to see more">
                            <InfoRoundedIcon style={{ 'color': '#323940', 'width': '20px', }} />
                        </IconButton>
                    </Tooltip>
                </TooltipWrapper>
                <FeaturedTitle>Highest Earning Courses</FeaturedTitle>
                <FeaturedSub>{getCurrentMonth()}</FeaturedSub>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>{platformEarnings?.currentMonthHighestEarningCourses[0].name}</FeaturedMoney>
                </FeaturedMoneyContainer>
            </FeaturedItem>
            <FeaturedItem onClick={openMonthTutorDialog}>
            <TooltipWrapper>
                    <Tooltip title="Click to see more">
                        <IconButton aria-label="Click to see more">
                            <InfoRoundedIcon style={{ 'color': '#323940', 'width': '20px', }} />
                        </IconButton>
                    </Tooltip>
                </TooltipWrapper>
                <FeaturedTitle>Highest Earning  Tutors</FeaturedTitle>
                <FeaturedSub>{getCurrentMonth()}</FeaturedSub>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>{platformEarnings?.currentMonthHighestEarningTutors[0].name}</FeaturedMoney>
                </FeaturedMoneyContainer>      
            </FeaturedItem>
        </Featured>
        <Featured>
            <FeaturedItem>
                <FeaturedTitle>Total Earnings</FeaturedTitle>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>{platformEarnings?.lifetimePlatformEarnings}</FeaturedMoney>
                </FeaturedMoneyContainer>
            </FeaturedItem>
            <FeaturedItem>
                <FeaturedTitle>Monthly Earnings</FeaturedTitle>
                <FeaturedSub>{getCurrentMonth()}</FeaturedSub>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>{platformEarnings?.currentMonthPlatformEarnings}</FeaturedMoney>
                    <FeaturedMoneyRate>
                        {platformEarnings?.increaseInMonthlyProfit ? <FeaturedIconUpward /> : <FeaturedIconDownward />}
                    </FeaturedMoneyRate>
                </FeaturedMoneyContainer>
            </FeaturedItem>
        </Featured>
        <Dialog onClose={handleCloseDialog} aria-labelledby="simple-dialog-title" open={openLCDialog}>
        <DialogTitle id="simple-dialog-title">Highest Earning Courses</DialogTitle>
        <List>
            {platformEarnings?.lifetimeHighestEarningCourses.map((course) => (           
            <ListItem style={{'color': '#3B60E4'}}>
                <CourseIcon />
                <ListItemText primary={course.name} />
            </ListItem>
             ))}
        </List>
        </Dialog>
        <Dialog onClose={handleCloseDialog} aria-labelledby="simple-dialog-title" open={openLTDialog}>
        <DialogTitle id="simple-dialog-title">Highest Earning Tutors</DialogTitle>
        <List>
            {platformEarnings?.lifetimeHighestEarningTutors.map((course) => (           
            <ListItem style={{'color': '#3B60E4'}}>
                <TutorIcon />
                <ListItemText primary={course.name} />
            </ListItem>
             ))}
        </List>
        </Dialog>
        <Dialog onClose={handleCloseDialog} aria-labelledby="simple-dialog-title" open={openMCDialog}>
        <DialogTitle id="simple-dialog-title">Highest Earning Courses in {getCurrentMonth()}</DialogTitle>
        <List>
            {platformEarnings?.currentMonthHighestEarningCourses.map((course) => (           
            <ListItem style={{'color': '#3B60E4'}}>
                <CourseIcon />
                <ListItemText primary={course.name} />
            </ListItem>
             ))}
        </List>
        </Dialog>
        <Dialog onClose={handleCloseDialog} aria-labelledby="simple-dialog-title" open={openMTDialog}>
        <DialogTitle id="simple-dialog-title">Highest Earning Tutors in {getCurrentMonth()}</DialogTitle>
        <List>
            {platformEarnings?.currentMonthHighestEarningTutors.map((course) => (           
            <ListItem style={{'color': '#3B60E4'}}>
                <TutorIcon />
                <ListItemText primary={course.name} />
            </ListItem>
             ))}
        </List>
        </Dialog>
        
        </>
    )
}

export default FeaturedInfo
