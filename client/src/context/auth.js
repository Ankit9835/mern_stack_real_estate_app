import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        user: null,
        newToken: "",
        refreshToken: "",
      });

      useEffect(() => {
        const fsjs = JSON.parse(localStorage.getItem('auth'))
        if(fsjs){
            setAuth(fsjs)
        }
      },[])

    axios.defaults.baseURL = process.env.REACT_APP_URL
    
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export {useAuth, AuthProvider}