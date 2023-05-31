import { useContext } from "react";
import AuthContext from "./AuthProvider";

const useAuth=()=>{
    const {user} = useContext(AuthContext)
    return useContext(AuthContext)
}

export default useAuth;