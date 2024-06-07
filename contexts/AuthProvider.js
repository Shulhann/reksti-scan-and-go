"use client"

import React, { useState, useEffect } from "react";
import { auth } from "../app/firebase.js";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return React.useContext(AuthContext);
}

const AuthProvider = (props) => {
  const { children } = props;
  const [isLogin, setIsLogin] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLogin(!!user);
      if (initializing) setInitializing(false);
    });
    return () => subscriber(); // Unsubscribe on cleanup
  }, [initializing]);

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signOut = () => {
    setIsLogin(false);
    return firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ isLogin, signIn, signUp, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
