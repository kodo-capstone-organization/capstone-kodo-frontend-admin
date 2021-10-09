import styled from "styled-components";
import { colours } from "../../../values/Colours"
import { fontSizes } from "../../../values/FontSizes"
import ForumIcon from '@material-ui/icons/Forum';


export const CourseListContainer = styled.div`
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
    font-size: ${fontSizes.SUBHEADER};
    color: ${colours.GRAY2};
    font-weight: bold;
`;

export const DataGridContainer = styled.div`
    height: 400px;
    width: 100%;
`

export const BtnWrapper = styled.div`
    display: flex;  
    justify-content: space-between;
    margin-top: 10px;
    width: 100%;
`

export const ForumButton = styled(ForumIcon)`
    margin-right: 8px;
`


