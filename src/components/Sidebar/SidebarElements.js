import styled from "styled-components"
import { Link } from "react-router-dom"
import { colours } from "../../values/Colours"

export const Nav = styled.div`
    background: ${colours.GRAY2};
    height: 50px;
    margin-top: -50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    z-index: 1;
`;

export const NavIcon = styled(Link)`
    position: fixed;
    margin-left: 2rem;
    font-size: 2rem;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
export const NavIconTwo = styled.div`
    margin-left: 1rem;
    font-size: 2rem;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
`;

export const SidebarNav = styled.nav`
    background: ${colours.GRAY2};
    box-shadow: ${({ sidebar }) => (sidebar ? '0 0 0 10000px rgba(0,0,0,.50)' : '0')};
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transition: 200ms;
    z-index: 10;
`
export const SidebarWrap = styled.div`
    width: 100%;
`

export const LogoutButton = styled(Link)`
    padding-left: 1.5rem;
    font-size: 1.5rem;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: white;
    background-color: transparent;
    text-decoration: none;
    list-style: none;
    margin-top: 250px;
    //bottom: 2rem;
    //left: 0;
    //position: absolute;
`
export const LogoutText = styled.div`
    font-size: 18px !important;
    padding: 20px;
`