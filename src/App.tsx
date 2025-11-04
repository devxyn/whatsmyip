import Details from "./components/Details";
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import { MapProvider } from "./context/MapContext";

const App = () => {
  return (
    <MapProvider>
      <main>
        <Navbar />
        <section className='flex flex-col gap-10 lg:gap-0 lg:flex-row w-full h-full lg:h-dvh pt-8 lg:pt-[80px]'>
          <Details />
          <Map />
        </section>
      </main>
    </MapProvider>
  );
};

export default App;
