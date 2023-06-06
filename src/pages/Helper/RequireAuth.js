import { useLocation,Navigate,Outlet } from "react-router-dom";
import useAuth from "./useAuth";
import { useContext } from "react";
import AuthContext from "./AuthProvider";
import {useCookies} from 'react-cookie'

const RequireAuth = ({allowedRole})=>{
    const {user,isLogged} = useAuth()
    const location = useLocation();

    let cookie = checkCookies('logged')
    let login_type = checkCookies('login_type')

    let role = [parseInt(login_type)]
    if(allowedRole.find(x=>role.includes(x))&&cookie)
    {
      return <Outlet/>
    }
    else if(cookie)
    {
      return <Navigate to={'/error'} state={{from:location}} replace/>
    }
    else
    {
      return <Navigate to={'/'} state={{from:location}} replace />
    }
}

const checkCookies=(name)=>{
  try {
      var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match[2]
  } catch (error) {
      return null
  }
  
}

export default RequireAuth