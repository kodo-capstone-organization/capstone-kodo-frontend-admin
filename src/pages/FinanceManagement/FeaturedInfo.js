import styled from "styled-components";
import { colours } from "../../../values/Colours"
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

// Elements for FeaturedInfo
export const Featured = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

export const FeaturedItem = styled.div`
    flex: 1;
    margin: 0px 20px;
    padding: 30px;
    border-radius: 10px;
    cursor: pointer;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`

export const FeaturedTitle = styled.div`
    font-size: 20px;
`

export const FeaturedMoneyContainer = styled.div`
    margin: 10px 0px;
    display: flex;
    align-items: center;
`

export const FeaturedMoney = styled.span`
    font-size: 30px;
    font-weight: 600;
`

export const FeaturedMoneyRate = styled.span`
    display: flex;
    align-items: center;
    margin-left: 20px;
`

export const FeaturedSub = styled.span`
    font-size: 15px;
    color: gray;
`

export const FeaturedIconUpward = styled(ArrowUpward)`
    font-size: 14px;
    margin-left: 5px;
    color: ${colours.GREEN};
`

export const FeaturedIconDownward = styled(ArrowDownward)`
    font-size: 14px;
    margin-left: 5px;
    color: ${colours.RED};
`