import React, {useState} from 'react'
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu/SubMenu';
import * as FaIcons from 'react-icons/fa'
import { IconContext } from 'react-icons/lib';
import { useHistory } from "react-router-dom";
import { Nav, NavIcon, NavIconTwo, SidebarNav, SidebarWrap, LogoutButton, LogoutText } from "./SidebarElements"


function Sidebar() {
    const [auth, setAuth] = useState(true);
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    let history = useHistory();

    const logoutBtnClick = (e) => {
      setAuth(!auth);
      e.preventDefault();
      
      window.sessionStorage.removeItem("loggedInAccountId");
      window.sessionStorage.removeItem("loggedInAccountUsername");
      window.sessionStorage.removeItem("loggedInAccountPassword");
      history.push('/');
    }

    return (
        <>
        <IconContext.Provider value={{ color: '#fff' }}>
            <Nav>
                <NavIcon to="#">
                    <FaIcons.FaBars onClick={showSidebar} />
                </NavIcon>
            </Nav>
            <SidebarNav sidebar={sidebar}>
                <SidebarWrap>
                    <NavIconTwo to='#'>
                        <FaIcons.FaTimes onClick={showSidebar} />
                    </NavIconTwo>
                    {SidebarData.map((item, index) => {
                        return <SubMenu item={item} key={index} />;
                    })}
                    <LogoutButton to="/" onClick={logoutBtnClick}>
                        <FaIcons.FaSignOutAlt />
                        <LogoutText>Logout</LogoutText>
                    </LogoutButton>
                </SidebarWrap>         
            </SidebarNav>
        </IconContext.Provider>
        </>
    )
}

export default Sidebar
