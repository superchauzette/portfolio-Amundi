import { createContext, useContext, useState, useEffect } from "react";
import { firebase } from "../firebase";

const context = createContext();

export function useAuth() {
  return useContext(context);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const logout = () => {
    return firebase.auth().signOut();
  };

  return (
    <context.Provider value={{ user, loading, login, logout }}>
      {children}
    </context.Provider>
  );
}
