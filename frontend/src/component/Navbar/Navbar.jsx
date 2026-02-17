import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar({
  sidebarOpen,
  setSidebarOpen,
  setSearchOpen,
  cartCount
  
}) {
  const [user, setUser] = useState(""); 

useEffect(() => {
    // Look for the item using the exact same key: 'username'
    const storedName = localStorage.getItem('username');
    if (storedName) {
      setUser(storedName);
    }
  }, []);


  return (
    <div>
      <nav className="fixed top-0 left-0 flex justify-between items-center px-6 md:px-10 w-full h-20 z-50 bg-white shadow-sm">

        {/* --- LEFT SECTION --- */}
        <div className="flex items-center w-1/3">
          {/* MOBILE ONLY: Hamburger */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block md:hidden"
          >
            <MenuIcon fontSize="large" className="text-orange-950" />
          </button>

          {/* DESKTOP ONLY: Logo moves here */}
          <Link to="/" className="hidden md:flex items-center gap-2 text-orange-950">
            <img src="/images/coffee.png" alt="Logo" className="w-10 sm:w-22" />
            <h1 className="font-bold text-[12px] leading-tight">Me You<br />Coffee...</h1>
          </Link>
        </div>

        {/* --- CENTER SECTION --- */}
        <div className="flex justify-center items-center w-1/3">
          {/* MOBILE ONLY: Logo stays centered */}
          <div className="flex md:hidden flex-col items-center text-orange-950">
            <img src="/images/coffee.png" alt="Logo" className="w-10" />
            <h1 className="font-bold text-[10px]">Me You Coffee...</h1>
          </div>

          {/* DESKTOP ONLY: Links appear centered */}

          <div className="hidden md:flex gap-8 text-black font-semibold uppercase tracking-wide text-sm">
            <Link to="/" className="hover:text-orange-800 transition-colors">Home</Link>
            <Link to="/menu" className="hover:text-orange-800 transition-colors">Menu</Link>
            <Link to="/merch" className="hover:text-orange-800 transition-colors">Merch</Link>
            <Link to="/gallery" className="hover:text-orange-800 transition-colors">Gallery</Link>
          </div>
        </div>

        {/* --- RIGHT SECTION --- */}
        <div className="flex justify-end items-center gap-4 w-1/3">
          {/* Search Icon */}
          <button
            onClick={() => setSearchOpen(true)}
            className="transition-transform duration-200 hover:scale-125 active:scale-95"
          >
            <SearchIcon fontSize="medium" className="text-orange-950" />
          </button>

          {/* Cart Icon */}
        <Link to="/cart" className="relative">
        <ShoppingCartIcon />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] 
          w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
            {cartCount}
          </span>
        )}
      </Link>

          {/* Account Icon (Desktop Only) */}
          <Link
            to="/login"
            className="hidden md:block transition-transform duration-200 hover:scale-125 active:scale-95"
          >
            <div className="flex justify-center items-center flex-col">
            <AccountCircle fontSize="medium" className="text-orange-950" />
            <p className="text-xs text-orange-950">{user}</p>

            </div>
          </Link>
        </div>
      </nav>

      {/* Spacer to push page content down so it's not hidden under the fixed nav */}
      <div className="h-20" />
    </div>
  );
}