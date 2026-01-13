import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login and store user + token
  const loginUser = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  // Logout function
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Load user and validate token
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    // If nothing stored → logout
    if (!token || !storedUser) {
      return logoutUser();
    }

    try {
      const decoded = jwtDecode(token);

      // Token expired?
      if (decoded.exp * 1000 < Date.now()) {
        logoutUser();
      } else {
        // Token is valid → restore user
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      logoutUser(); // Invalid token
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
