import { useLocation,Navigate,Outlet } from "react-router-dom";
import useAuth from "./useAuth";
import { useContext } from "react";
import AuthContext from "./AuthProvider";

const RequireAuth = ({allowedRole})=>{
    const {user} = useAuth()
    const location = useLocation();
    let role = user!=null?[user.role_id]:[0]
    return(
       
      allowedRole.find(x=>role.includes(x))?<Outlet/>
            :<Navigate to={'/'} state={{from:location}} replace />
    )
}

export default RequireAuth