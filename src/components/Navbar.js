import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import './App.css';
import {Link} from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
// import { AiOutlineConsoleSql } from "react-icons/ai";
import * as AiIcons from 'react-icons/ai';
import  NavbarData  from "./NavbarData";
import Submenu from "./Submenu";
import { IconContext } from "react-icons/lib";
import './navbar.css'
import useAuth from "../pages/Helper/useAuth";
import { checkCookies } from "../pages/Helper/Auth";

const Nav = styled.div`
     background: #E5E5E5;
     width: 100vw;
     height: 12vh;
     display: flex;
     justify-content: flex-start;
     align-items: center;
     `;

const NavIcon = styled(Link)`
     margin-left: 3%;
     font-size: 2vw;
     height: 12vh;
     display: flex;
     justify-content: flex-start;
     align-items: center;
     margin-right: 2%
`;

const SidebarNav = styled.nav`
     background: #552D59;
     width: 23vw;
     height:100vh;
     display: flex;
     text-align: center;
     justify-content: center;
     position: absolute;
     top: 0;
     left: ${({navbar}) => (navbar ? '0' : '-100%')};
     transition: 350 ms ease-in;
     z-index: 10;
     font-size: 2vw;
`;

const SidebarWrap = styled.nav`
     width: 100%;
     height: 100%;
`;
//login logout on navbar
const UserIcon = styled(Link)`
  
     margin-left: 50%;
     font-size: 2vw;
     height: 90px;
     display: flex;
     justify-content: flex-start;
     align-items: center;
     
`;

const Navbar = () =>{
    const [navbar, setNavbar] = useState(false)
    const [navbarData,setData] = useState([])
    const {user,setUser,setLogged} = useAuth()
    const showNavbar = () => setNavbar(!navbar)
    
    useEffect(()=>{
      filterArr(NavbarData).then(resp=>{
        setData(resp)
      })
    },[])

    const logOutUser=async()=>{
        try {
            document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Max-Age=-99999";
            document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;Max-Age=-99999";
            document.cookie = "login_type=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;Max-Age=-99999";
            document.cookie = "logged=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;Max-Age=-99999";
            setUser(null)
            setLogged(false)
            localStorage.clear()
        } catch (error) {
            
        }
    }

    return(
        <>
        <IconContext.Provider value={{ color : '#fff'}}>
            <Nav>
                <NavIcon to='#'>
                    <FaIcons.FaBars onClick={showNavbar}/>
                </NavIcon>
                <img src="/images/axzorapvtltdLogo.png" alt="" className="HeaderSideLogo"/>
                <UserIcon to='#'>
                    <FaIcons.FaUserCircle onClick={showNavbar} className="FaUserCircleSize"/>
                   
                </UserIcon>
                <label className="UserNameLabel">{user.username}</label>
                <div className="LogOutBuTTon">
                <button onClick={()=>logOutUser()} className="btn btn-primary">Logout</button>
            </div>
            </Nav>
            <div className="lowerborder"></div>
           
            <SidebarNav className="side_nav_bar" navbar={navbar}>
                <SidebarWrap>
                <NavIcon to='#'>
                    <AiIcons.AiOutlineClose onClick={showNavbar}/>
                    <img src="/images/axzorapvtltdLogo.png" alt="" className="SideBarLogo"/>
                </NavIcon>
                {navbarData.map((item,index) =>{
                    return <Submenu item={item} key={index} />;
                }) 
                }
                </SidebarWrap>
            </SidebarNav>
            </IconContext.Provider>
        </>
    );
};     


const filterArr = async(menuItems)=>{
    let role = await checkCookies('login_type')
    if(role==10)
    {
        return menuItems.filter(item=>item.title!=='Designation'&&item.title!=='Roles'&&item.title!=='Add Data'&&item.title!=='Document type'&&item.title!=='Companies'&&item.title!=='Department'&&item.title!=='Level types')
    }
    else
    {
        return menuItems
    }

    
   
}


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