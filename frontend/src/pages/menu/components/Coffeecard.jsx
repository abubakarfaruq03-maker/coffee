

export default function Coffeecard({item, onClick}) {
    return (
     <div className="w-screen lg:w-88.5 h-120 lg:h-90 flex justify-center items-center my-4 ">
           <div className="w-full h-full flex flex-col justify-center mx-4 items-center gap-4 rounded-4xl border-b pb-12
             hover:underline cursor-pointer" onClick={onClick}>
                <div className="w-full h-full flex justify-center items-start">
                          <img src={item.menu_image} alt={item.title} className="w-full h-100 lg:h-80 rounded-t-2xl" />

                </div>
                <div className=" mb-4 flex flex-col justify-center items-center font-oswald gap-2">
                    <p className="text-2xl font-extralight">{item.title}</p>
                    <p className="text-2xl font-extralight">${item.price}</p>
                </div>
            </div>
     </div>
    )
}