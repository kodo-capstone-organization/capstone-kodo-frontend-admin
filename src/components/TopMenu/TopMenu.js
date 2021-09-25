import { useEffect, useState } from "react";
import { Container, MenuContainer, NavLogo} from "./TopMenuElements";

function TopMenu(props) {

    const [scrollNav, setScrollNav] = useState(false);  

    const changeNav = () => {
      if (window.scrollY >= 80) {
        setScrollNav(true);
      } else {
        setScrollNav(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener("scroll", changeNav);
    }, []);
    
    return (
      <Container scrollNav={scrollNav}>
        <MenuContainer>
          <NavLogo to="/finance/insights">kodo</NavLogo>
        </MenuContainer>
      </Container>
    );
  };

export default TopMenu;
