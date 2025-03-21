import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

interface FilterProps {
  placeholder: string;
  value: string | null;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  disabled?: boolean;
}

const Filter = ({
  placeholder,
  value,
  onChange,
  options,
  disabled = false,
}: FilterProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { theme } = useTheme();

  const arrowIconLight = "/assets/arrow-down.svg";
  const arrowIconDark = "/assets/arrow-down2.svg";

  return (
    <div className="relative">
      <div
        className={`w-full min-w-[200px] max-w-[200px] text-base font-normal bg-light-bg dark:bg-dark2-bg px-6 py-[18px] rounded-[5px] shadow-[0_2px_9px_0px_#0000000E] outline-none flex justify-between items-center gap-4 cursor-pointer ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className="truncate">{value || placeholder}</span>
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <img
            src={theme === "dark" ? arrowIconDark : arrowIconLight}
            alt="dropdown arrow"
            className="w-[12px]"
          />
        </span>
      </div>

      {isOpen && (
        <div className="absolute w-full min-w-[200px] max-w-[200px] px-6 py-4 z-50 max-h-[300px] overflow-y-auto bg-light-bg dark:bg-dark2-bg rounded-[5px] shadow-[0_2px_9px_0px_#0000000E] mt-1">
          {options.map((option, index) => (
            <div
              key={index}
              className="p-2 hover:bg-card cursor-pointer"
              onClick={() => {
                onChange({
                  target: { value: option },
                } as React.ChangeEvent<HTMLSelectElement>);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
