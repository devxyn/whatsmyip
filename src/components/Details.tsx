import ky from "ky";
import { useEffect, useState, type FormEvent } from "react";
import { useMapContext, type IPData } from "../context/MapContext";
import { parseOrgProvider } from "../utils";

const Details = () => {
  const [ip, setIp] = useState<string>("");

  const { ipData, setIpData } = useMapContext();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response: IPData = await ky.get(`https://ipinfo.io/${ip}/geo`).json();
    setIpData(response);
  };

  useEffect(() => {
    const handleGetUserIp = async () => {
      const response: IPData = await ky.get(`https://ipinfo.io/geo`).json();
      setIpData(response);
    };

    handleGetUserIp();
  }, [setIpData]);

  return (
    <aside className='flex-1 px-10 pt-16 w-1/2'>
      <h2 className='text-5xl font-bold mb-2'>Welcome to Find My IP</h2>
      <p className='mb-5 text-lg text-gray-300'>
        Effortlessly explore IP address information and discover locations around the world. Enter any IP address below
        to see its details and location instantly.
      </p>
      <form onSubmit={handleSubmit} className='flex items-center gap-4 mb-2'>
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIp(e.target.value)}
          type='text'
          className='w-full md:w-64 px-4 py-2 rounded bg-[#232323] border border-light-border focus:outline-none focus:ring-1 focus:ring-blue-500 text-white'
          placeholder='Search for any IP address...'
        />
        <button
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:cursor-pointer hover:bg-blue-700 transition'>
          Search
        </button>
      </form>

      <div className='mt-10 bg-[#1e293b] p-6 rounded-lg shadow border border-light-border max-w-lg'>
        <dl className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3'>
          <div>
            <dt className='text-xs text-gray-400 uppercase tracking-wide'>IP Address</dt>
            <dd className='text-lg font-semibold text-white'>{ipData?.ip || "-"}</dd>
          </div>
          <div>
            <dt className='text-xs text-gray-400 uppercase tracking-wide'>City</dt>
            <dd className='text-lg text-white'>{ipData?.city || "-"}</dd>
          </div>
          <div>
            <dt className='text-xs text-gray-400 uppercase tracking-wide'>Postal Code</dt>
            <dd className='text-lg text-white'>{ipData?.postal || "-"}</dd>
          </div>
          <div>
            <dt className='text-xs text-gray-400 uppercase tracking-wide'>Country</dt>
            <dd className='text-lg text-white'>{ipData?.country || "-"}</dd>
          </div>
          <div>
            <dt className='text-xs text-gray-400 uppercase tracking-wide'>Provider</dt>
            <dd className='text-lg text-white'>{parseOrgProvider(ipData?.org)}</dd>
          </div>
          <div>
            <dt className='text-xs text-gray-400 uppercase tracking-wide'>Timezone</dt>
            <dd className='text-lg text-white'>{ipData?.timezone || "-"}</dd>
          </div>
        </dl>
      </div>
    </aside>
  );
};

export default Details;
