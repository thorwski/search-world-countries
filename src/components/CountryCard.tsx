import { formatNumber } from "../utils/Functions";

interface CountryCardProps {
  flag: string;
  name: string;
  population: number;
  region: string;
  capital: string;
}

const CountryCard = ({
  flag,
  name,
  population,
  region,
  capital,
}: CountryCardProps) => {
  return (
    <div className="bg-light-bg dark:bg-dark2-bg rounded-[5px] shadow-[0_0px_7px_0px_#0000000E]">
      <div>
        <img
          src={flag}
          alt={`${name} flag`}
          className="rounded-t-[5px] w-full h-[167px] object-fill shadow-[0_0px_7px_0px_#0000000E]"
        />
      </div>
      <div className="p-6 space-y-4">
        <h2 className="font-extrabold text-lg truncate">{name}</h2>
        <div className="flex flex-col gap-2 mb-3">
          <p className="text-sm font-semibold">
            Population:{" "}
            <span className="font-light">{formatNumber(population)}</span>
          </p>
          <p className="text-sm font-semibold">
            Region: <span className="font-light">{region}</span>
          </p>
          <p className="text-sm font-semibold">
            Capital: <span className="font-light">{capital}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
