/* eslint-disable react/prop-types */
const GeoData = ({ data }) => {
  return (
    <div className='w-full lg:w-1/2 lg:h-[400px] flex flex-col flex-nowrap justify-center bg-secondary p-5 lg:p-10 rounded-t-lg lg:rounded-se-none lg:rounded-l-lg text-white'>
      <p className='text-lg lg:text-2xl'>
        <span className='font-semibold mr-1'>IP:</span>
        {data?.ip}
      </p>
      <p className='text-lg lg:text-2xl'>
        <span className='font-semibold mr-1'>City:</span>
        {data?.city}
      </p>
      <p className='text-lg lg:text-2xl'>
        <span className='font-semibold mr-1'>Region:</span>
        {data?.region}
      </p>
      <p className='text-lg lg:text-2xl'>
        <span className='font-semibold mr-1'>Country:</span>
        {data?.country}
      </p>
      <p className='text-lg lg:text-2xl'>
        <span className='font-semibold mr-1'>Location:</span>
        {data?.loc}
      </p>
      <p className='text-lg lg:text-2xl'>
        <span className='font-semibold mr-1'>Organization:</span>
        {data?.org}
      </p>
      <p className='text-lg lg:text-2xl'>
        <span className='font-semibold mr-1'>Postal code:</span>
        {data?.postal}
      </p>
      <p className='text-lg lg:text-2xl'>
        <span className='font-semibold mr-1'>Timezone:</span>
        {data?.timezone}
      </p>
    </div>
  );
};

export default GeoData;
