import { createContext, useState } from "react";

export const AuthContext = createContext(null);

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = 'expires' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getIsLoggedIn(){
    const payloadRaw = getCookie("payload")
    
    const isLoggedIn = payloadRaw !== null && payloadRaw !== ""

    const payload= isLoggedIn ? JSON.parse(payloadRaw) : null

    return {
        isLoggedIn,
        payload
    }
}

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(getIsLoggedIn().isLoggedIn);
    const [payload, setPayload] = useState(getIsLoggedIn().payload)

    const login = (payload) => {
        setIsLoggedIn(true);

        setCookie("payload", JSON.stringify(payload), 1);

        setPayload(payload)

    }
    
    // const userPayload = (payload) => {
    //     setPayload(payload)
        
    // }

    const logout = () => {
        setIsLoggedIn(false);

        setCookie("payload", null, 0);

        setPayload(null)
    }

    return (
        <AuthContext.Provider value={{
            payload,
            isLoggedIn,
            // userPayload,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}
