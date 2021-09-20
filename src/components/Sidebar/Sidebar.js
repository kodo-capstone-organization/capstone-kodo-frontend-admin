import React, {useState, useEffect} from 'react'
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu/SubMenu';
import * as FaIcons from 'react-icons/fa'
import { IconContext } from 'react-icons/lib';
import { useHistory } from "react-router-dom";
import { Nav, NavIcon, NavIconTwo, SidebarNav, SidebarWrap, LogoutButton, LogoutText } from "./SidebarElements"


function Sidebar(props, {defaultActive}) {
    const [auth, setAuth] = useState(true);
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const location = props.history.location;
    const [activeIndex, setActiveIndex] = useState(defaultActive || 0);
    let history = useHistory();

    // Re-renders when the route changes
    useEffect(() => {
        // Get index of item with the same / containing 'route' as the one provided by react router (the current route)
        // Using "includes" ensures that even nested pages are counted
        const activeItem = SidebarData.findIndex(item => location.pathname.includes(item.route));
        setActiveIndex(activeItem)
    }, [location])

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
