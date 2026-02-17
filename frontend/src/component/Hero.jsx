import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export default function Hero({ colorChange, setColorChange }) {

  const changeNavbarColor = () => {
    if (window.innerWidth < 640) {
      if (window.scrollY >= 5) {
        setColorChange(true);
      } else {
        setColorChange(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarColor);
    return () => window.removeEventListener("scroll", changeNavbarColor);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex justify-between  items-start sm:items-stretch w-full h-64 sm:h-screen gap-8 sm:gap-0 sm:rounded-br-none sm:border-0 rounded-br-[16rem]
      ${colorChange ?
          "bg-white sm:border-0 border-2 sm:bg-linear-to-r sm:from-white sm:from-50% sm:to-orange-950 sm:to-50%  border-orange-950" : "bg-orange-950 sm:border-0"}`}
    >
      {/* Image animation */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="h-2/3 sm:h-full w-1/2 sm:w-1/2 sm:mt-0 mt-10 sm:bg-white "
      >
        <img
          src="/images/coffee-2.png"
          alt=""
          className="w-full sm:h-full h-full object-cover"
        />
      </motion.div>


      <motion.div
        initial={{ opacity: 0, }}
        animate={{ opacity: 1, }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className={`flex flex-col justify-center items-start gap-6 mt-10 sm:items-center lg:w-1/2
        ${colorChange ? "text-orange-950" : "text-white"}
        lg:bg-orange-950 lg:text-white lg:border-0
        `}

      >
        <h1 className="font-light text-2.5xl sm:text-6xl sm:pl-8 sm:leading-tight">
          <span className="font-bold">START</span>   <br className="hidden sm:block" /> YOUR DAY WITH COFFEE
        </h1>

        <Link to="/menu">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="hover:bg-[#a18a83] border border-current p-2 px-6 text-1xl rounded-full bg-white text-orange-950 transition-colors"
          >
            Get Your Coffee
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
