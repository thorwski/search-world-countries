import { useTheme } from "../context/ThemeContext";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  const { theme } = useTheme();

  const magGlassIconLight = "/assets/magnifying-glass.svg";
  const magGlassIconDark = "/assets/magnifying-glass2.svg";

  return (
    <div className="bg-light-bg dark:bg-dark2-bg flex items-center gap-6 px-8 py-[18px] rounded-[5px] shadow-[0_2px_9px_0px_#0000000E] w-full md:max-w-[480px]">
      <img
        src={theme === "dark" ? magGlassIconDark : magGlassIconLight}
        alt="magnifying glass icon"
        className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]"
      />
      <input
        className="text-base font-normal w-full outline-none dark:placeholder:text-dark-text"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;
