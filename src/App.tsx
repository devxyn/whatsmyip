import Details from "./components/Details";
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import { MapProvider } from "./context/MapContext";

const App = () => {
  return (
    <MapProvider>
      <main>
        <Navbar />
        <section className='flex flex-col md:flex-row w-full h-dvh pt-[80px]'>
          <Details />
          <Map />
        </section>
      </main>
    </MapProvider>
  );
};

export default App;
