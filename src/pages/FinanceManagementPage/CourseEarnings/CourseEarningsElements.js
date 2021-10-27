import styled from "styled-components";
import { colours } from "../../../values/Colours"
import { fontSizes } from "../../../values/FontSizes"

// Elements for Earnings Index
export const CourseEarningsContainer = styled.div`
    max-width: 75rem;
    padding: 1rem;
    margin: calc(50px + 1rem) auto 0;
    font-family: "Roboto", sans-serif;
`


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
    margin-left: 20px;
`;

export const SubHeadingWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 2rem;
    font-size: ${fontSizes.CONTENT};
    color: ${colours.BLUE1};
    margin-left: 20px;

`;

export const DataGridContainer = styled.div`
    height: 400px;
    width: 100%;
`

export const BtnWrapper = styled.div`
    margin-top: 10px;
    width: 150px;
`

export const MessageContainer = styled.div`
  display: flex;
  margin: 3rem;
  align-items: center;
  justify-content: center;
`

export const Message = styled.h1`
  display: flex;
  color: ${colours.BLUE1}
`

export const CourseWidgets = styled.div`
    display: flex;
    justify-content: space-between;

`