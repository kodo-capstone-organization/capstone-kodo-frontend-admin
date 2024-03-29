import React, {useEffect, useState} from 'react';
import TopMenu from "./TopMenu/TopMenu";
import Sidebar from "./Sidebar/Sidebar";
import {SidebarData} from "./Sidebar/SidebarData"
import {LayoutContentWrapper, LayoutContentPage} from "./LayoutElements";

function Layout(props) {

    const location = props.history.location;

    const [showSideBar, setShowSideBar] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
//            

    useEffect(() => {
        if (window.sessionStorage.getItem("loggedInAccountId"))
        {
            //item.path === location.pathname
            setShowSideBar(true);
        } else {
            setShowSideBar(false)
        }
    }, [location])

    return (
        <div>
            <TopMenu />
            <LayoutContentWrapper>
                { showSideBar && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} history={props.history}/> }
                <LayoutContentPage onClick={e => setSidebarOpen(false)}>
                    {props.children}
                </LayoutContentPage>
            </LayoutContentWrapper>
        </div>
    );
}

export default Layout;