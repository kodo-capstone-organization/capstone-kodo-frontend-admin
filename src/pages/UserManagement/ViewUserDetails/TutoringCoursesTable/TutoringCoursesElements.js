import styled from "styled-components";
import { colours } from "../../../../values/Colours"
import { fontSizes } from "../../../../values/FontSizes"

export const TutoringCoursesContainer = styled.div`
    max-width: 75rem;
    padding: 1rem;
    margin: calc(50px + 1rem) auto 0;
    font-family: "Roboto", sans-serif;
`;

export const HeadingWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 96%;
    margin-bottom: 2rem;
    margin-left: 20px;
    font-size: ${fontSizes.CONTENT};
    color: ${colours.BLUE1};
`;

export const DataGridContainer = styled.div`
    height: 400px;
    width: 100%;
`