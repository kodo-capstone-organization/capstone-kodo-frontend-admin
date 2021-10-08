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
    MessageContainer
} from "../../FeaturedInfo";
import {
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    DialogTitle,
    Dialog
} from '@material-ui/core';


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
            <FeaturedItem onClick={openLifetimeCourseDialog} more={platformEarnings?.lifetimeHighestEarningCourses?.length >= 1 ? true : false}>
                <FeaturedTitle>Highest Earning Course</FeaturedTitle>
                <FeaturedSub>Lifetime</FeaturedSub>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>{platformEarnings?.lifetimeHighestEarningCourses[0].name}</FeaturedMoney>
                </FeaturedMoneyContainer>
                {platformEarnings?.lifetimeHighestEarningCourses?.length > 1 ? 
                <FeaturedSub more>Click to see more</FeaturedSub> : "" }
            </FeaturedItem>
            <FeaturedItem onClick={openLifetimeTutorDialog} more={platformEarnings?.lifetimeHighestEarningTutors?.length > 1 ? true : false}>
                <FeaturedTitle>Highest Earning  Tutors</FeaturedTitle>
                <FeaturedSub>Lifetime</FeaturedSub>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>{platformEarnings?.lifetimeHighestEarningTutors[0].name}</FeaturedMoney>
                </FeaturedMoneyContainer>
                {platformEarnings?.lifetimeHighestEarningTutors?.length > 1 ? 
                <FeaturedSub more>Click to see more</FeaturedSub> : "" }
            </FeaturedItem>
            <FeaturedItem onClick={openMonthCourseDialog} more={platformEarnings?.currentMonthHighestEarningCourses?.length > 1 ? true : false}>
                <FeaturedTitle>Highest Earning Course</FeaturedTitle>
                <FeaturedSub>{getCurrentMonth()}</FeaturedSub>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>{platformEarnings?.currentMonthHighestEarningCourses[0].name}</FeaturedMoney>
                </FeaturedMoneyContainer>
                {platformEarnings?.currentMonthHighestEarningCourses?.length > 1 ? 
                <FeaturedSub more>Click to see more</FeaturedSub> : "" }
            </FeaturedItem>
            <FeaturedItem onClick={openMonthTutorDialog} more={platformEarnings?.currentMonthHighestEarningTutors?.length > 1 ? true : false}>
                <FeaturedTitle>Highest Earning  Tutors</FeaturedTitle>
                <FeaturedSub>{getCurrentMonth()}</FeaturedSub>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>{platformEarnings?.currentMonthHighestEarningTutors[0].name}</FeaturedMoney>
                </FeaturedMoneyContainer>
                {platformEarnings?.currentMonthHighestEarningTutors?.length > 1 ? 
                <FeaturedSub more>Click to see more</FeaturedSub> : "" }
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
            <ListItem>
                <ListItemText primary="Course" />
            </ListItem>
        </List>
        </Dialog>
        </>
    )
}

export default FeaturedInfo
