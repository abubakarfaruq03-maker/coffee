import { createContext, useState, useEffect } from "react";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  
const fetchMenu = async () => {
    try {
      setLoading(true); 
      const res = await fetch(`${API_BASE_URL}/api/menu`);
      
      if (!res.ok) throw new Error("Server responded with an error");
      
      const data = await res.json();
      setMenu(data);
    } catch (err) {
      console.error("Failed to fetch menu", err);
      setError(err.message); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <MenuContext.Provider value={{ menu, loading, error, fetchMenu }}>
      {children}
    </MenuContext.Provider>
  );
};