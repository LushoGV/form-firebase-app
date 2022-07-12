import { useContext, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { useEffect } from "react";
import { useState } from "react";

export const context = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [check, setCheck] = useState({
    email: false,
    pass: false,
    errEmail: false,
    errPass: false,
  });

  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logOut = () => signOut(auth);

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const checkData = (e, type) => {
    if (type == 1) {
      if (e.target.value != "") {
        setCheck({ ...check, errEmail: false });
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.target.value)) {
          setCheck({ ...check, errEmail: false });
          setCheck({ ...check, email: true });
        } else {
          setCheck({ ...check, email: false });
          setCheck({ ...check, errEmail: "Invalid email" });
        }
      } else {
        setCheck({ ...check, email: false });
      }
    } else {
      if (e.target.value != "") {
        if (e.target.value.length >= 6) {
          setCheck({ ...check, errPass: false });
          setCheck({ ...check, pass: true });
        } else {
          setCheck({ ...check, pass: false });
          setCheck({
            ...check,
            errPass: "Password must be at least 6 characters long",
          });
        }
      } else {
        setCheck({ ...check, pass: false });
      }
    }
  };

  const clearAlert = (e, type) => {
    if (type == 1) {
      if (e.target.value != "") {
        setCheck({ ...check, errEmail: false });
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.target.value)) {
          setCheck({ ...check, errEmail: false });
        }
      }
    } else {
      if (e.target.value != "") {
        if (e.target.value.length >= 6) {
          setCheck({ ...check, errPass: false });
        }
      }
    }
  };

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
      //chequea si hay un usuario logueado
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsuscribe();
  }, []);

  return (
    <context.Provider
      value={{
        signUp,
        login,
        logOut,
        user,
        loading,
        loginWithGoogle,
        resetPassword,
        check,
        checkData,
        clearAlert,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useAuthContext = () => {
  const {
    signUp,
    login,
    logOut,
    user,
    loading,
    loginWithGoogle,
    resetPassword,
    check,
    checkData,
    clearAlert,
  } = useContext(context);
  return {
    signUp,
    login,
    logOut,
    user,
    loading,
    loginWithGoogle,
    resetPassword,
    check,
    checkData,
    clearAlert,
  };
};
