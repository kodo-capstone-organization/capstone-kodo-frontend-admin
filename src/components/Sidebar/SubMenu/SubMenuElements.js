import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colours } from "../../../values/Colours"

export const SidebarLink = styled(Link)`
  display: flex;
  color: white;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: ${colours.BLUE1};
    color: white;
    border-left: 4px solid ${colours.GRAYHALF6};
    cursor: pointer;
  }
`;

export const SidebarLabel = styled.span`
  margin-left: 16px;
  
`;

export const DropdownLink = styled(Link)`
  background: ${colours.GRAY3};
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 18px;
  &:hover {
    background: ${colours.BLUE2};
    cursor: pointer;
  }
`;