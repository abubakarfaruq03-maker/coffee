import { createContext, useState, useEffect } from "react";

// 1. Create the Context object
export const MenuContext = createContext();

// 2. Create the Provider component
export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  

  const fetchMenu = async () => {
    try {
      const res = await fetch("http://172.20.10.5:3000/api/menu");
      const data = await res.json();
      setMenu(data);
    } catch (err) {
      console.error("Failed to fetch menu", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // 3. Wrap children in the Provider and pass the values
  return (
    <MenuContext.Provider value={{ menu, loading, error, fetchMenu }}>
      {children}
    </MenuContext.Provider>
  );
};