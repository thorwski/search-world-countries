import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import { formatNumber } from "../utils/Functions";
import DetailItem from "../components/DetailItem";
import { useTheme } from "../context/ThemeContext";

interface CountryDetails {
  cca3: string;
  name: {
    common: string;
    official: string;
    nativeName: Record<string, { official: string; common: string }>;
  };
  population: number;
  region: string;
  capital?: string[];
  flags: {
    png: string;
  };
  subregion?: string;
  tld?: string[];
  currencies?: Record<string, { name: string }>;
  languages?: Record<string, string>;
  borders?: string[];
}

const CountryDetails = () => {
  const { theme } = useTheme();
  const { countryCode } = useParams<{ countryCode: string }>();
  const [country, setCountry] = useState<CountryDetails | null>(null);
  const [borderCountries, setBorderCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const leftArrowIconLight = "/assets/left-arrow.svg";
  const leftArrowIconDark = "/assets/left-arrow2.svg";

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const URL = "https://restcountries.com/v3.1/alpha";
        const response = await axios.get(`${URL}/${countryCode}`);
        const countryData = response.data[0];
        setCountry(countryData);

        if (countryData.borders && countryData.borders.length > 0) {
          const borderResponse = await axios.get(
            `https://restcountries.com/v3.1/alpha?codes=${countryData.borders.join(
              ","
            )}`
          );
          const borderNames = borderResponse.data.map(
            (borderCountry: CountryDetails) => borderCountry.name.common
          );
          setBorderCountries(borderNames);
        }
      } catch (error) {
        console.error("Error fetching country details:", error);
      } finally {
        setLoading(false);
      }
    };
    handleFetch();
  }, [countryCode]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-lg text-gray-600 dark:text-dark-text">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-6">
        <p className="text-lg text-red-500">Country not found</p>
        <Link
          to="/"
          className="flex gap-[10px] items-center bg-light-bg dark:bg-dark2-bg rounded-[5px] shadow-[0_0px_7px_0px_#0000000E] px-8 py-[10px] cursor-pointer"
        >
          <img
            src={theme === "dark" ? leftArrowIconDark : leftArrowIconLight}
            alt="left arrow icon"
          />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  const nativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0]?.common ?? country.name.common
    : country.name.common;

  return (
    <div>
      <div className="">
        <Header />
        <main className="pt-30 md:pt-40 px-7 md:px-20 space-y-[64px] md:space-y-20 pb-15">
          <Link
            to="/"
            className="flex gap-[10px] items-center bg-light-bg dark:bg-dark2-bg rounded-[5px] shadow-[0_0px_7px_0px_#0000000E] px-8 py-[10px] cursor-pointer max-w-[136px]"
          >
            <img
              src={theme === "dark" ? leftArrowIconDark : leftArrowIconLight}
              alt="left arrow icon"
            />
            <span>Back</span>
          </Link>
          <div className="flex flex-col xl:flex-row gap-11 xl:gap-[144px]">
            <img
              src={country.flags.png}
              alt={`${country.name.common} flag`}
              className="w-full xl:max-w-[560px] xl:min-h-[401px] rounded-[10px]"
            />
            <div>
              <div>
                <h1 className="text-[32px] font-extrabold mb-6">
                  {country.name.common}
                </h1>
                <div className="flex flex-col xl:flex-row gap-8 xl:gap-[50px] 2xl:gap-[140px]">
                  <div className="flex flex-col gap-2">
                    <DetailItem label="Native name" value={nativeName} />
                    <DetailItem
                      label="Population"
                      value={formatNumber(country.population)}
                    />
                    <DetailItem label="Region" value={country.region} />
                    <DetailItem label="Sub Region" value={country.subregion} />
                    <DetailItem label="Capital" value={country.capital?.[0]} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <DetailItem
                      label="Top Level Domain"
                      value={country.tld?.[0]}
                    />
                    <DetailItem
                      label="Currencies"
                      value={
                        country.currencies?.[Object.keys(country.currencies)[0]]
                          ?.name
                      }
                    />
                    <DetailItem
                      label="Languages"
                      value={Object.values(country.languages || {})
                        .sort()
                        .join(", ")}
                    />
                  </div>
                </div>
              </div>
              {borderCountries.length > 0 && (
                <div className="mt-8">
                  <p className="text-base font-semibold">Border Countries:</p>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {[...borderCountries]
                      .sort((a, b) => a.localeCompare(b))
                      .map((borderCountry) => (
                        <span
                          key={borderCountry}
                          className="truncate font-light text-sm px-5 py-1 bg-light-bg dark:bg-dark2-bg rounded-[5px] shadow-[0_0px_7px_0px_#0000000E] cursor-pointer text-center"
                        >
                          {borderCountry}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CountryDetails;
