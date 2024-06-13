/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { initialState, geoReducer } from '../reducers/geoDataReducer';
import Map from '../component/Map';
import GeoData from '../component/GeoData';
import useCheckHistory from './../hooks/useCheckHistory';

const Home = () => {
  const [ip, setIp] = useState('');
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [selectedItems, setSelectedItems] = useState([]);
  const [history, setHistory] = useState(useCheckHistory);
  const [geoState, geoDispatch] = useReducer(geoReducer, initialState);

  useEffect(() => {
    fetchGeoData();

    const savedItem = window.localStorage.getItem('history');
    const savedHistory = JSON.parse(savedItem);
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    const jsonString = JSON.stringify(history);
    if (history) {
      window.localStorage.setItem('history', jsonString);
    }
  }, [history]);

  const fetchGeoData = async () => {
    try {
      const response = await axios.get('https://ipinfo.io/geo');
      const loc = response.data.loc.split(',');
      setLocation({ lat: parseFloat(loc[0]), lng: parseFloat(loc[1]) });
      geoDispatch({ type: 'FETCH_GEO_SUCCESS', payload: response.data });
    } catch (error) {
      console.error(error);
      geoDispatch({ type: 'FETCH_GEO_FAILURE', payload: error.response.data });
    }
  };

  const handleSearch = async (input) => {
    try {
      const response = await axios.get(`https://ipinfo.io/${input}/geo`);
      const loc = response.data.loc.split(',');
      geoDispatch({ type: 'FETCH_GEO_SUCCESS', payload: response.data });
      setLocation({ lat: parseFloat(loc[0]), lng: parseFloat(loc[1]) });
      setIp(input);

      if (!history.includes(response.data.ip)) {
        setHistory((prev) => [...prev, response.data.ip]);
      }
    } catch (error) {
      console.error(error);
      geoDispatch({ type: 'FETCH_GEO_FAILED', payload: 'Invalid IP address' });
    }
  };

  const handleClearSearch = () => {
    setIp('');
    fetchGeoData();
  };

  const handleSelectedCheckbox = (e, item) => {
    if (e.target.checked) {
      setSelectedItems((prev) => [...prev, item]);
    } else {
      setSelectedItems((prev) => prev.filter((i) => i !== item));
    }
  };

  const handleDeleteSelected = () => {
    const updatedHistory = history.filter((item) => !selectedItems.includes(item));
    setHistory(updatedHistory);
    setSelectedItems([]);
  };

  return (
    <div className='bg-background text-white px-5 py-10 lg:flex lg:p-0 lg:h-screen'>
      <div className='flex flex-col gap-5 mb-10  lg:mb-0 lg:gap-10 lg:bg-primary lg:w-[25%] lg:p-10'>
        <div className='flex flex-row items-center justify-between mb-5'>
          <h1 className='text-3xl font-bold'>What's my IP?</h1>
        </div>

        <div className='flex flex-col items-center gap-2'>
          <div className='relative w-full'>
            <input
              type='text'
              name='ip-address'
              id='ip-address'
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className='block px-2.5 pb-2.5 pt-5 w-full text-sm text-white bg-secondary rounded-lg border border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer'
              placeholder=' '
            />
            <label
              htmlFor='ip-address'
              className='absolute text-sm text-white duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1'>
              Enter IP address:
            </label>
          </div>

          {geoState.error && <p className='w-full px-3 py-2 bg-red-400 text-xs rounded-lg'>{geoState.error}</p>}

          <div className='flex justify-center gap-4'>
            <button className='bg-secondary px-4 py-2 rounded-lg' onClick={() => handleSearch(ip)}>
              Search
            </button>
            <button className='bg-secondary px-4 py-2 rounded-lg' onClick={handleClearSearch}>
              Reset
            </button>
          </div>
        </div>

        {history && (
          <div className='mb-5'>
            <div className='flex flexrow justify-between items-center'>
              <h4 className='text-xl'>Search History</h4>
              <button
                onClick={handleDeleteSelected}
                disabled={!history || history.length === 0}
                className='px-4 py-2 text-xl bg-secondary rounded-lg text-red-600  font-semibold '>
                Delete
              </button>
            </div>
            <ul className='pl-5'>
              {history.map((item, index) => (
                <li className=' list-disc text-lg flex flex-row items-center gap-2' key={index}>
                  <input
                    type='checkbox'
                    checked={selectedItems.includes(item)}
                    onChange={(e) => handleSelectedCheckbox(e, item)}
                  />
                  <p className='cursor-pointer hover:underline' onClick={() => handleSearch(item)}>
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className='w-full lg:w-[75%] flex flex-col items-center justify-center lg:px-10 lg:flex lg:flex-row lg:justify-center lg:items-center'>
        <GeoData data={geoState.geoData} />
        <Map lat={location.lat} lng={location.lng} />
      </div>
    </div>
  );
};

export default Home;
