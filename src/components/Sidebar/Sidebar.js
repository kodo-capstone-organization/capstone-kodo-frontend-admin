import React, {useState} from 'react'
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu/SubMenu';
import * as FaIcons from 'react-icons/fa'
import { IconContext } from 'react-icons/lib';
import { Nav, NavIcon, NavIconTwo, SidebarNav, SidebarWrap, LogoutButton, LogoutText } from "./SidebarElements"


function Sidebar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

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
                    <LogoutButton to="#">
                        <FaIcons.FaSignOutAlt />
                        <LogoutText>Admin Console</LogoutText>
                    </LogoutButton>
                </SidebarWrap>         
            </SidebarNav>
        </IconContext.Provider>
        </>
    )
}

export default Sidebar
