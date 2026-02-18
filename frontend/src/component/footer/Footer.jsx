import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import Button from '@mui/material/Button';
import SocialRef from "./socialRef";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <div className="flex flex-col mt-8  gap-2 lg:py-16 ">
                <div className=" lg:flex lg:justify-center lg:items-center">
                    <img src="/images/coffee.png" alt="footer_image" className="w-18 lg:w-42" />
                    <h1 className="font-bold text-5xl hidden lg:block font-oswald">COFFEE HUT</h1>

                </div>
                <div className="lg:flex lg:justify-around lg:items-start ">
                    <div className="font-oswald flex flex-col gap-6 pb-12 ml-5">
                        <h1 className="font-bold text-3xl lg:hidden">COFFEE HUT</h1>
                        <p className="text-xl lg:text-2xl lg:font-bold  font-normal pb-0.5 ">SOUTH BEAN</p>

                        <p className="text-xl font-light flex gap-1">  <FaLocationDot /> 123 Coffee bean</p>
                        <p className="text-xl lg:text-xl   font-light pb-0.5">Wonderland CA0000 </p>
                        <a href="https://wa.me/09053559658"
                            className="text-xl font-light flex gap-1 mt-4" target="_blank"><FaPhone />+2349053559658</a>
                        <button className="py-2 px-4 w-fit border border-black transition-all duration-300 rounded-full hover:bg-black hover:text-white">More Info</button>
                    </div>
                    <hr className="w-full border-b border-gray-300 lg:hidden" />


                    <div className="flex flex-col lg:flex-row font-oswald gap-12 ml-5 py-12">
                        <div className="flex flex-col gap-8 text-xl" >
                            <p className="hover:text-gray-400">About Us</p>
                            <Link to="/menu" className="hover:text-gray-400">Menu</Link>
                            <Link to="/gallery" className="hover:text-gray-400">Gallery</Link>
                            <p className="hover:text-gray-400">For Business Partners</p>

                        </div>
                        <div className="lg:hidden" >
                            <SocialRef />
                        </div>

                        <div className="flex gap-8 flex-col">
                            <div className="flex flex-col gap-2">
                                <p className="font-normal text-2xl">SIGN UP FOR OUR NEWSLETTER</p>
                                <p className="font-light text-xl">Join our email list for updates and the latest news</p>
                            </div>


                            <div className="relative flex items-center justify-center w-72 pt-2">
                                <input
                                    type="text"
                                    placeholder="Email*"
                                    required
                                    className="flex-1 border p-2 border-orange-950 rounded-full bg-white"
                                />
                                <Button>  <span className="text-3xl font-bold text-orange-950 absolute right-20 bottom-[-8px] pointer-none:">&#8594;</span>
                                </Button>
                            </div>
                            <div className="flex justify-center items-center lg:hidden">
                                <p className="mt-8 text-sm text-gray-500">
                                    © {new Date().getFullYear()} Coffee Hut. All rights reserved.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className=" justify-center items-center hidden lg:flex lg:flex-col">
                    <div className="hidden lg:block" >
                        <SocialRef />
                    </div>
                    <p className="mt-8 text-sm text-gray-500">
                        © {new Date().getFullYear()} Coffee Hut. All rights reserved.
                    </p>
                </div>

            </div>




        </>

    )
}