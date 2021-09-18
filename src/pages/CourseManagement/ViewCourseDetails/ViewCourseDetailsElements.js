import styled from "styled-components";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import { fontSizes } from "../../../values/FontSizes";
import { colours } from "../../../values/Colours";


export const CourseDetailsContainer = styled.div`
    max-width: 75rem;
    padding: 1rem;
    margin: calc(50px + 1rem) auto 0;
    font-family: "Roboto", sans-serif;
`;

export const HeadingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 1rem;
    font-size: ${fontSizes.CONTENT};
    color: ${colours.BLUE1};
`;

export const CourseDetailsEditContainer = styled.div`
    padding: 2rem;
    font-family: "Roboto", sans-serif;
    font-size: ${fontSizes.CONTENT};
    > * {
        margin: 0 0 2rem 0;
    }
`; // add bottom margin of 2rem to all direct children of ProfileContainer

export const CourseDetailsCard = styled(Card)`
    width: 100%;
`;

export const CourseDetailsContent = styled(CardContent)`
    display: flex;
    flex-direction: row;
    background-color: ${colours.WHITE};
    color: ${colours.GRAY2};
    align-items: center;
    padding: 2rem !important;
`;

export const CourseDetailsCardHeader = styled(CardHeader)`
    display: flex;
    flex-direction: row;
    background-color: ${colours.GRAY3};
    color: ${colours.GRAYHALF6};
    height: 1.5rem;
    
    > .MuiCardHeader-content > span {
        font-size: ${fontSizes.CONTENT};
        font-weight: bold;
    }
    
    > .MuiCardHeader-action {
        margin: initial;
        align-self: center;
        color: ${colours.GRAY2};
        
        >.MuiIconButton-root >.MuiIconButton-label {
           font-size: ${fontSizes.SUBTEXT} !important;
        }
    }
`;
