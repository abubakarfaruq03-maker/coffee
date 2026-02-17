import Hero from "../component/Hero";
import Monthly from "../component/Monthly";
import FeaturedCoffee from "../component/FeaturedCoffee";
import NewestCoffee from "../component/NewestCoffee";

export default function Home({ colorChange, setColorChange }) {
  return (
    <>
      <Hero colorChange={colorChange} setColorChange={setColorChange} />
      <Monthly />
      <FeaturedCoffee />
      <NewestCoffee />
    </>
  );
}