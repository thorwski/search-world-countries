const Header = () => {
  const moonIcon = "/assets/moon-light.svg";

  return (
    <header className="flex justify-between items-center px-4 py-8 md:px-20 md:py-6 w-full max-h-[80px] fixed bg-white shadow-[0_2px_4px_0px_#0000000E] z-100">
      <h1 className="text-xl md:text-2xl font-extrabold">
        Where in the world?
      </h1>
      <div>
        <button className="flex items-center gap-2">
          <img src={moonIcon} alt="moon icon" className="w-4 md:w-5" />
          <span className="text-xs md:text-base font-semibold">Dark Mode</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
