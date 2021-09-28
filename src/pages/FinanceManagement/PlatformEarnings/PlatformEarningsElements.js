import styled from "styled-components";
import { colours } from "../../../values/Colours"
import { fontSizes } from "../../../values/FontSizes"
import { TextField, Card, CardHeader, CardContent, CardActions } from "@material-ui/core";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";


// Elements for Earnings Index
export const InsightContainer = styled.div`
    max-width: 75rem;
    padding: 1rem;
    margin: calc(50px + 1rem) auto 0;
    font-family: "Roboto", sans-serif;
`

export const AbsoluteDataContainer = styled.div``

export const GraphDataContainer = styled.div``



export const EarningCard = styled(Card)`
    width: 100%;
`;

export const EarningCardHeader = styled(CardHeader)`
    display: flex;
    flex-direction: row;
    background-color: ${colours.GRAYHALF6};
    color: ${colours.GRAY3};
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

export const EarningCardContent = styled(CardContent)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: ${colours.WHITE};
    color: ${colours.GRAY2};
    align-items: center;
    padding: 2rem !important;
    padding: ${({ removePadTop }) => (removePadTop ? "0 2rem 2rem 2rem !important" : "2rem !important")};
`;

// Elements for FeaturedInfo
export const Featured = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

export const FeaturedItem = styled.div``

export const FeaturedMoney = styled.span``

export const FeaturedMoneyRate = styled.span``

export const FeaturedSub = styled.span``

export const FeaturedIconUpward = styled(ArrowUpward)``

export const FeaturedIconDownward = styled(ArrowDownward)``






// Elements for Earnings Details
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

export const SubHeadingWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 96%;
    margin-bottom: 2rem;
    font-size: ${fontSizes.CONTENT};
    color: ${colours.BLUE1};
`;

export const DataGridContainer = styled.div`
    height: 400px;
    width: 100%;
`

export const BtnWrapper = styled.div`
    margin-top: 10px;
    width: 150px;
`