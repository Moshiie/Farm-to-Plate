import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import{ auth, db } from '../firebaseConfig';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const AuthContext = createContext();

const AuthProvider = (props) => {
  // user null = loading  
  const [user, setUser] = useState(null);
  const [userAuthData, setUserAuthData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(true);
        setUserAuthData(u);
        fetchUserData(u.uid); // Fetch corresponding user data from Firestore
      } else {
        setUser(false);
        setUserAuthData(null);
        setUserData(null); // Clear user data if logged out
      }
    });
    return unsubscribe; // Cleanup on unmount
  }, []);

  const fetchUserData = async (uid) => {
    try {
      // the user document from Firestore using the user's UID
      const docRef = doc(db, 'users', uid); //Create Reference
      const docSnap = await getDoc(docRef); //Get Specific User Doc using Reference

      if (docSnap.exists()) {
        setUserData(docSnap.data());  // Set user data from Firestore to state
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userAuthData,
        userData,
        isFirstLaunch,
        setIsFirstLaunch
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };