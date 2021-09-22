import styled from "styled-components";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import { fontSizes } from "../../../values/FontSizes";
import { colours } from "../../../values/Colours";

export const UserDetailsContainer = styled.div`
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

export const SwitchWrapper = styled.div`
    display: grid;
    grid-template-columns: 50px 50px;
    margin-left: 500px;
`;

export const UserDetailsCard = styled(Card)`
    width: 100%;
`;

export const UserDetailsContent = styled(CardContent)`
    display: flex;
    flex-direction: row;
    background-color: ${colours.WHITE};
    color: ${colours.GRAY2};
    align-items: center;
    padding: 2rem !important;
`;

export const UserDetailsCardHeader = styled(CardHeader)`
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

export const DetailsCard = styled.div`
  display: flex;
  height: auto;
  width: auto;
  padding: 50px;
  border-radius: 30px;
  border: 1px solid ${colours.GRAY6};

`;

export const DetailsWrapper = styled.div`
    display: grid;
    grid-template-columns: 300px 500px;
    grid-gap: 2rem;
`

export const CardTitle = styled.div`
  font-size: ${fontSizes.SUBTEXT};
  color: ${colours.GRAY1};
  font-weight: bold !important;
  margin-left: 20px;
  margin-bottom: 2rem;
`

export const RowTitle = styled.div`
  font-size: ${fontSizes.SUBTEXT};
  color: ${colours.GRAY4};
  font-weight: bold !important;
  margin-left: 20px;
`

export const CardDescription = styled.div`
  font-size: ${fontSizes.SUBTEXT};
  color: ${colours.GRAY3};

`;

export const CardLine = styled.div`
    width: 100px;
    border: 1px solid ${colours.GRAY6};
    padding-left: 20px;
    padding-right: 20px;  
`


export const BtnWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-item: center;
    margin-top: 2rem;
`

export const ChipWrapper = styled.div`
    width: 300px;
`
