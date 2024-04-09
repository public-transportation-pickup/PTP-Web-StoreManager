// src/hooks/useAuth.jsx

import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../libs/Commons/UseLocalStorage";
import PropTypes from 'prop-types';
import { replace } from "formik";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [user2, setUser2] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    // console.log(data);
    // localStorage.setItem("accessToken", data.token);
    setUser(data);
    setUser2(data);
    // navigate("/",{replace:true });
    // navigate(0)
    // window.location.reload();
  };

  // call this function to sign out logged in user
  const logout = () => {
    localStorage.clear(); 
    setUser(null);
    navigate("/sign-in", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      user2,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes={
  children:PropTypes.any
}

