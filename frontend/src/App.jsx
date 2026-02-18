import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { MenuProvider } from "./contexts/MenuContext";
import { Toaster } from "react-hot-toast";
import Navbar from "./component/Navbar/Navbar";
import Sidebar from "./component/Navbar/Sidebar";
import Searchbar from "./component/Navbar/Searchbar";
import Footer from "./component/footer/Footer";
import SelectedDrink from "./pages/menu/selectedMenu/selectedDrink";
import Cart from "./pages/cart/Cart";
import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Merch from "./pages/merch/Merch";
import Gallery from "./pages/gallery/Gallery";
import ScrollToTop from "./component/ScrolltoTop";
import "./index.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [colorChange, setColorChange] = useState(false);
  
  const [cartCount, setCartCount] = useState(0);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Function to fetch the current cart total from your API
  const updateCartCount = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/cart`);
      if (!res.ok) {
       console.error("Server responded with error:", res.status);
       return;
    }
      const data = await res.json();
      const totalItems = data.reduce((sum, item) => sum + item.quantity, 0);
    
setCartCount(totalItems);    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  return (
    <MenuProvider>
      <div className="bg-white min-h-screen">
        <Toaster
          position="top-center"
          containerStyle={{ zIndex: 99999 }}
        />
        <ScrollToTop />
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setSearchOpen={setSearchOpen}
          colorChange={colorChange}
          setColorChange={setColorChange}
          cartCount={cartCount} 
        />

        <Searchbar searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

{/* ROUTES */}
        <Routes>
          <Route
            path="/"
            element={<Home colorChange={colorChange} setColorChange={setColorChange} />}
          />
          <Route path="/menu" element={<Menu />} />

          
          <Route 
            path="/menu/:id/:slug" 
            element={<SelectedDrink onAddSuccess={updateCartCount}  />} 
          />
          <Route path="/menu/featured/:drinkName" element={<SelectedDrink onAddSuccess={updateCartCount} />} />
          <Route path="/cart" element={<Cart onCartChange={updateCartCount} />}
           />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/merch" element={<Merch />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>

        <Footer />
      </div>
    </MenuProvider>
  );
}

export default App;