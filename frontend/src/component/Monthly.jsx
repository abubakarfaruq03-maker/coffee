import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper/modules";
import { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { MenuContext } from "../contexts/MenuContext";

// Swiper Styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function Monthly() {
   const { menu, loading, error, fetchMenu } = useContext(MenuContext);
   const navigate = useNavigate()

  const month = new Date().toLocaleString("default", { month: "long" });
  const handleGoToMenu = () => {
    navigate("/menu"); 
  };

  return (
    <section className="w-full py-10 px-4 lg:px-20">
      {/* Parent Container: Vertical on mobile, Horizontal split on lg (1024px+) */}
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 lg:gap-0 w-full min-h-[500px]">

        {/* --- LEFT SIDE: TEXT CONTENT (50%) --- */}
        <motion.div
          className="flex flex-col justify-center items-center lg:items-start lg:w-1/2 text-center lg:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
        >
          {/* Title Wrapper: Locks the wavy line to the text height */}
          <div className="relative inline-block mb-8">
            <h2 className="text-3xl lg:text-5xl font-semibold text-orange-950 leading-tight">
              {month} Specials
            </h2>

            {/* Wavy Line Animation */}
            <motion.svg
              viewBox="0 0 100 6"
              preserveAspectRatio="none"
              className="absolute left-0 top-full mt-2 w-full h-2"
              variants={{
                hidden: { scaleX: 0 },
                visible: { scaleX: 1 }
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ originX: 0 }}
            >
              <path
                d="M0 3 Q 5 0 10 3 T 20 3 T 30 3 T 40 3 T 50 3 T 60 3 T 70 3 T 80 3 T 90 3 T 100 3"
                fill="none"
                stroke="#6f4e37"
                strokeWidth="3"
              />
            </motion.svg>
          </div>

          {/* Description: Hidden on mobile, shown on SM+ */}
          <p className="hidden sm:block text-orange-900/80 text-lg max-w-md lg:pr-10 leading-relaxed">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
            Mollitia adipisci placeat expedita soluta illum atque ducimus 
            tempore maiores ut, exercitationem rem deserunt.
          </p>
        </motion.div>

        {/* --- RIGHT SIDE: SWIPER AREA (50%) --- */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            loop={true}
            slidesPerView={1}
            centeredSlides
            simulateTouch
            grabCursor
            className="monthly-swiper w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[400px]"
          >
            {/* Slide 1 */}
              {menu.map((item) => (
          <SwiperSlide key={item.id}>
              <div className="flex justify-center items-center sm:py-6" >
                <div className="w-[220px] h-[260px] bg-[#ede8d0] sm:bg-white flex flex-col 
                items-center gap-6 shadow-xl rounded-b-3xl overflow-hidden border border-orange-100" onClick={handleGoToMenu}>
                  <img 
                    src={item.menu_image}
                    alt={item.title} 
                    className="w-full h-44 object-cover"
                  />
                  <p className="text-xl font-light text-orange-950 uppercase tracking-wide">
                    {item.title}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
           

           
          </Swiper>

          {/* Promo Text (Centered below the Swiper) */}
          <div className="italic text-lg text-center mt-6 text-orange-900/70 font-medium">
            <p>Get 20% off of your first three orders!!</p>
          </div>
        </div>
      </div>
    </section>
  );
}