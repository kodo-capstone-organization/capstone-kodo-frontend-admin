import styled from "styled-components";
import { colours } from "../../../values/Colours"
import { fontSizes } from "../../../values/FontSizes"

export const UserListContainer = styled.div`
    max-width: 60rem;
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
    font-size: ${fontSizes.HEADER};
    color: ${colours.GRAY2};
    font-weight: bold;
`;

export const DataGridContainer = styled.div`
    height: 400px;
    width: 100%;
`

export const BtnWrapper = styled.div`
    margin-top: 10px;
    width: 150px;
`