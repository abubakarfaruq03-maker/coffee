import { useEffect } from "react";
import { Link } from "react-router-dom"; 
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";


export default function Sidebar({ sidebarOpen, setSidebarOpen }) {

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  return (
    <div>
      <div
        className={`fixed left-0 right-0 top-20 bottom-0 bg-black/40 z-10
        ${sidebarOpen ? "block" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div
        className={`fixed flex flex-col justify-between items-start
        top-20 bottom-0 left-0 w-screen
        bg-white text-black z-20 shadow-lg transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300`}
      >
        <div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="m-2 p-4 rounded-full text-xl focus:bg-[#ede8d0]"
          >
            <CloseIcon fontSize="large" />
          </button>

          <nav className="flex flex-col gap-6 mt-4 ml-10">
               <Link
              to="/"
              className="font-normal text-2xl m-2"
              onClick={() => setSidebarOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className="font-normal text-2xl m-2"
              onClick={() => setSidebarOpen(false)}
            >
              Menu
            </Link>

          

            <Link
              to="/merch"
              className="font-normal text-2xl m-2"
              onClick={() => setSidebarOpen(false)}
            >
              Merch
            </Link>

            <Link
              to="/gallery"
              className="font-normal text-2xl m-2"
              onClick={() => setSidebarOpen(false)}
            >
              Gallery
            </Link>
          </nav>
        </div>

        <div className="w-[80%] flex flex-col gap-8">
          <hr className="w-full mx-10 border-gray-300" />
          <div className="pl-10 pb-8 w-fit flex justify-start">
              <Link
                to="/login"
                className="flex items-center gap-2 bg-white border border-black text-black px-4 py-2 rounded-full"
              >
                <AccountCircle />
                <span>Sign In</span>
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

