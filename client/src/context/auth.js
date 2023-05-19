import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        user: null,
        newToken: "",
        refreshToken: "",
      });
   //   console.log('auth',auth)

      useEffect(() => {
        const fsjs = JSON.parse(localStorage.getItem('auth'))
        if(fsjs){
            setAuth(fsjs)
        }
      },[])

    axios.defaults.baseURL = process.env.REACT_APP_URL
    axios.defaults.headers.common["Authorization"] = auth?.newToken;
    axios.defaults.headers.common["refresh_token"] = auth?.refreshToken;
  
    axios.interceptors.response.use(
      (res) => {
        return res;
      },
      async (err) => {
        const originalConfig = err.config;
        
        if (err.response) {
            console.log('err',err)
          // token is expired
          if (err.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
  
            try {
              const { data } = await axios.get("/refresh-token");
              axios.defaults.headers.common["token"] = data.newToken;
              axios.defaults.headers.common["refresh_token"] = data.refreshToken;
  
              setAuth(data);
              localStorage.setItem("auth", JSON.stringify(data));
  
              return axios(originalConfig);
            } catch (_error) {
              if (_error.response && _error.response.data) {
                return Promise.reject(_error.response.data);
              }
  
              return Promise.reject(_error);
            }
          }
  
          if (err.response.status === 403 && err.response.data) {
            return Promise.reject(err.response.data);
          }
        }
  
        return Promise.reject(err);
      }
    );
    
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export {useAuth, AuthProvider}