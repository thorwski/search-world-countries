interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  const magGlassIcon = "/assets/magnifying-glass.svg";

  return (
    <div className="bg-white flex items-center gap-6 px-8 py-[18px] rounded-[5px] shadow-[0_2px_9px_0px_#0000000E] w-full md:max-w-[480px]">
      <img
        src={magGlassIcon}
        alt="magnifying glass icon"
        className="w-[16px] h-[16px] md:w-[18px] md:h-[18px]"
      />
      <input
        className="text-base font-normal w-full outline-none"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;
