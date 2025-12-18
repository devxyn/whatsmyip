const Navbar = () => {
  return (
    <header className='h-20 w-full px-10 border-b border-light-border lg:fixed'>
      <nav className='h-full flex flex-col xs:flex-row justify-center xs:justify-between items-center gap-2'>
        <a href='/' className='flex flex-row items-center text-3xl font-bold'>
          <img src='/logo.png' alt='logo' className='h-5 w-5 mr-2' />
          <h1>Find My Ip</h1>
        </a>

        <a className='text-xs' href='https://github.com/hermooo' target='_blank' rel='noopener noreferrer'>
          Developed by: <span className='font-bold'>hermooo</span>
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
