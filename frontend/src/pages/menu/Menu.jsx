import { useEffect, useState, useContext } from "react";
import { MenuContext } from "../../contexts/MenuContext";
import Coffeecard from "./components/Coffeecard";
import { getProductPath } from "./components/Getproductpath";
import { useNavigate } from "react-router-dom";


export default function Menu() {
  const { menu, loading, error, fetchMenu } = useContext(MenuContext);
  const navigate = useNavigate()




  // 3. UI for the Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl animate-pulse">Loading menu...</p>
      </div>
    );
  }

  // 4. UI for the Error state (with your Retry button)
  if (error) {
    return (
      <div className="flex py-4 justify-center mx-5 mt-8 rounded-full items-center flex-col gap-6 bg-red-200">
        <div className="text-red-500 font-semibold">{error}</div>
        <button
          className="px-8 py-1 bg-white rounded-full border border-red-300 active:bg-black active:text-white transition-colors"
          onClick={fetchMenu}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50  py-6">
      {loading && (
        <div className="flex justify-center items-center gap-3 mt-6 text-black">
          <div className="w-5 h-5 border-2 border-orange-950 border-t-transparent rounded-full animate-spin" />
          <span>Getting Menus...</span>
        </div>
      )}

      {!loading && (
        <div>
          <div className="text-center mt-16">
            <h1 className="text-4xl font-bold font-oswald">Our Menus</h1>
          </div>
          <div className="flex justify-start items-start lg:ml-5 flex-col gap-10 mt-15">
            <div className=" ml-5">
              <h1 className="text-3xl font-bold font-oswald">Featured Menus</h1>
            </div>
            <div className="py-2 flex justify-center items-center gap-10 flex-wrap">
              {menu.slice(13, 15).map((item) => (
                <Coffeecard key={item.id} item={item} onClick={() => navigate(getProductPath(item))} />
              ))}
            </div>

          </div>
          <div className="ml-5 lg:ml-10">
            <h1 className="text-3xl font-bold font-oswald "> Drinks</h1>
          </div>

          <div className="flex flex-col  justify-center items-center gap-20 py-2 md:grid md:grid-cols-3 mt-8 lg:mt-16">


            {menu.slice(0, 13).map((item) => (
              <Coffeecard key={item.id} item={item} onClick={() => navigate(getProductPath(item))} />
            ))}
          </div>

        </div>

      )}
      <hr className="w-full border-b border-gray-300 lg:mt-8" />


    </div>
  );
}