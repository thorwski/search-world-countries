import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const moonIconLight = "/assets/moon-light.svg";
  const moonIconDark = "/assets/moon-dark.svg";

  return (
    <header className="flex justify-between items-center px-4 py-8 md:px-20 md:py-6 w-full max-h-[80px] fixed bg-light-bg dark:bg-dark2-bg text-light-text dark:text-dark-text shadow-[0_2px_4px_0px_#0000000E] z-100">
      <h1 className="text-xl md:text-2xl font-extrabold">
        Where in the world?
      </h1>
      <div>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src={theme === "dark" ? moonIconDark : moonIconLight}
            alt="moon icon"
            className="w-4 md:w-5"
          />
          <span className="text-xs md:text-base font-semibold">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
