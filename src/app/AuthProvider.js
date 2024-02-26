"use client";

const { useState, useEffect, createContext } = require("react");

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
