import React, {useState} from "react";
import styled from 'styled-components';
import './App.css';
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
// import { AiOutlineConsoleSql } from "react-icons/ai";
import * as AiIcons from 'react-icons/ai';
import { NavbarData } from "./NavbarData";
import Submenu from "./Submenu";
import { IconContext } from "react-icons/lib";
import './navbar.css'

const Nav = styled.div`
     background: #552D59;
     height: 80px;
     display: flex;
     justify-content: flex-start;
     align-items: center;
     `;

const NavIcon = styled(Link)`
     margin-left: 2rem;
     font-size: 2rem;
     height: 80px;
     display: flex;
     justify-content: flex-start;
     align-items: center;
`;

const SidebarNav = styled.nav`
     background: #552D59;
     width: 250px;
     height:100vh;
     display: flex;
     justify-content: center;
     position: fixed;
     top: 0;
     left: ${({navbar}) => (navbar ? '0' : '-100%')};
     transition: 350 ms ease-in;
     z-index: 10;
`;

const SidebarWrap = styled.nav`
     width: 100%;
`;

const Navbar = () =>{
    const [navbar, setNavbar] = useState(false)

    const showNavbar = () => setNavbar(!navbar)
   

    return(
        <>
        <IconContext.Provider value={{ color : '#fff'}}>
            <Nav>
                <NavIcon to='#'>
                    <FaIcons.FaBars onClick={showNavbar}/>
                </NavIcon>
            </Nav>
            <SidebarNav className="side_nav_bar" navbar={navbar}>
                <SidebarWrap>
                <NavIcon to='#'>
                    <AiIcons.AiOutlineClose onClick={showNavbar}/>
                </NavIcon>
                {NavbarData.map((item,index) =>{
                    return <Submenu item={item} key={index} />;
                }) 
                }
                </SidebarWrap>
            </SidebarNav>
            </IconContext.Provider>
        </>
    );
};     


// function Navbar(){
//     return(
//         <nav className="navbar">
//             <h3>Logo</h3>
//             <ul className="nav-links">
//                 <Link to ='/roles'><li>Roles</li></Link>
//                 <Link to ='/designation'><li>Designation</li></Link>
//             </ul>
//         </nav>
//     );
// }

export default Navbar;