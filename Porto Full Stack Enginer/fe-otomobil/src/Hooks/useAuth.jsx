import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

export default function useAuth(){
        
        const {payload, isLoggedIn, login, logout} = useContext(AuthContext)

    return{
        payload,
        isLoggedIn,
        // userPayload,
        login,
        logout
    }
}