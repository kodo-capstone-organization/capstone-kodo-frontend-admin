import styled from "styled-components";
import { colours } from "../../values/Colours"
import { fontSizes } from "../../values/FontSizes"
import { Link as LinkR } from 'react-router-dom'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import SortIcon from '@material-ui/icons/Sort';

export const ForumPageContainer = styled.div`
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
    width: 100%;
    margin-bottom: 1rem;
    font-size: ${fontSizes.SUBHEADER};
    color: ${({ sub }) => (sub ? colours.GRAY6 : colours.GRAY2)};
    font-weight: bold;
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

`;

export const SubContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 2rem;
    font-size: ${fontSizes.SUBTEXT};
    color: ${colours.GRAY6};
    margin-top: -30px;
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
export const WidgetLg = styled.div`
    flex: 2;
    -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
    padding: 40px;
    margin-left: 20px;
    margin-right: 20px;
    height: 350px;
    overflow-x: hidden;
`

export const WidgetLgTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
`

export const WidgetLgTable = styled.table`
  width: 100%;
  border-spacing: 20px;
`

export const WidgetLgTh = styled.th`
  text-align: left;
  color: ${colours.GRAY2};

`

export const WidgetLgTr = styled.tr`
`

export const WidgetLgAmount = styled.td`
    color: ${colours.GRAY2};
`

export const WidgetLgLink = styled(LinkR)`
    color: ${colours.GRAY2};
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;

    &:hover {
        color: ${colours.BLUE1};
        transition: 0.3s ease-out;
        transform: scale(1.2);
        cursor: pointer;
        font-weight: bold;
      }
`

export const WidgetLgDeleteLink = styled(LinkR)`
    color: ${colours.GRAY2};
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;

    &:hover {
        color: ${colours.RED};
        transition: 0.3s ease-out;
        transform: scale(1.2);
        cursor: pointer;
        font-weight: bold;
      }
`

export const WidgetLgDate = styled(LinkR)`
    color: ${colours.GRAY2};
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;
    font-size: ${fontSizes.SUBTEXT};

    &:hover {
        color: ${colours.BLUE1};
        transition: 0.3s ease-out;
        transform: scale(1.2);
        cursor: pointer;
        font-weight: bold;
      }
`

export const WidgetCategoryLink = styled(LinkR)`
    font-weight: 300;
    color: ${colours.GRAY2};
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;


    &:hover {
        color: ${colours.BLUE1};
        transition: 0.3s ease-out;
        transform: scale(1.2);
        cursor: pointer;
        font-weight: bold;
      }

`

export const WidgetThreadLink = styled(LinkR)`
    font-weight: 300;
    color: ${colours.GRAY2};
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;


    &:hover {
        color: ${colours.BLUE1};
        transition: 0.3s ease-out;
        transform: scale(1);
        cursor: pointer;
        font-weight: bold;
      }

`

export const CategoryCard = styled.div`
    height: auto;
    width: auto;
    margin-bottom: 40px;
    border-radius: 20px;
    border: 0.1px solid ${colours.GRAY6};
`;

export const WidgetLgUser = styled.td`
  display: flex;
  align-items: center;
  color: ${colours.GRAY2};

`

export const WidgetLgImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
`

export const DeleteIcon = styled(DeleteForeverIcon)``

export const SortAlphaIcon = styled(SortByAlphaIcon)`
    color: ${colours.GRAY2};
`
export const SortOldNew = styled(SortIcon)`
    color: ${colours.GRAY2};
`
export const SortIconWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100px;
    margin-right: 20px;
`