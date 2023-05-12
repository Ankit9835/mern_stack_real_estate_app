import React, { useContext, useEffect, useState } from 'react'
import { useAuth } from '../../context/auth'
import { Outlet } from 'react-router-dom'
import axios from 'axios'

const PrivateRoute = () => {
    
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (auth?.newToken) getCurrentUser();
  }, [auth?.newToken]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get("/current-user", {
        headers: {
          Authorization: auth?.newToken,
        },
      });
      setOk(true);
    } catch (err) {
      setOk(false);
    }
  };

  return ok ? <Outlet /> : "";
  
}

export default PrivateRoute
