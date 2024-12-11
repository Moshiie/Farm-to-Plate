import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import{ auth } from '../firebaseConfig';

const AuthContext = createContext();

const AuthProvider = (props) => {
  // user null = loading
  const [user, setUser] = useState(null);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  function checkLogin() {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(true);
        // getUserData();
      } else {
        setUser(false);
        // setUserData(null);
      }
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isFirstLaunch,
        setIsFirstLaunch
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };