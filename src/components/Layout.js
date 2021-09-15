import TopMenu from "./TopMenu/TopMenu";
import Sidebar from "./Sidebar/Sidebar";
import {LayoutContentWrapper} from "./LayoutElements";

function Layout() {

    return (
        <div>
            <TopMenu />
            <LayoutContentWrapper>
                <Sidebar />
            </LayoutContentWrapper>
        </div>
    );
}

export default Layout;