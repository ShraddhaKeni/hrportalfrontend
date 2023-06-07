import { useContext } from "react";
import AuthContext from "./AuthProvider";

const useAuth=()=>{
    const {user,isLogged} = useContext(AuthContext)
    return useContext(AuthContext)
}

export default useAuth;