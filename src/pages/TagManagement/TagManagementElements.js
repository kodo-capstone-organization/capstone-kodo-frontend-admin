import styled from "styled-components";
import { colours } from "../../values/Colours"
import { fontSizes } from "../../values/FontSizes"

export const TagListContainer = styled.div`
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
    margin-top: 10px;
    width: 150px;
`

export const DeleteButton = styled.button`
  border-radius: 10px;
  background: ${({ primary }) => (primary ? colours.GRAY2 : colours.GRAY7)};
  white-space: nowrap;
  padding: ${({ big }) => (big ? "14px 48px" : "8px 30px")};
  color: ${({ primary }) => (primary ? colours.WHITE : colours.GRAY2)};
  text-decoration: none;
  font-size: ${({ fontBig }) =>
    fontBig ? fontSizes.CONTENT : fontSizes.SUBTEXT};
  font-weight: bold;
  outline: none;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  font-family: "Roboto", sans-serif;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary }) => (primary ? colours.GRAY3 : colours.GRAY6)};
    color: ${({ primary }) => (primary ? colours.WHITE : colours.GRAY1)};
  }
`;