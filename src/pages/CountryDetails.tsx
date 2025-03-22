import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import { formatNumber } from "../utils/Functions";
import DetailItem from "../components/DetailItem";
import { useTheme } from "../context/ThemeContext";
import { Country } from "./Interface";
import { API_BASE_URL } from "../utils/api";

const CountryDetails = () => {
  const { theme } = useTheme();
  const { countryCode } = useParams<{ countryCode: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [borderCountries, setBorderCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const leftArrowIcon =
    theme === "dark" ? "/assets/left-arrow2.svg" : "/assets/left-arrow.svg";

  const BackButton = () => (
    <Link
      to="/"
      className="flex gap-2 items-center bg-light-bg dark:bg-dark2-bg rounded-md shadow-sm px-8 py-2 cursor-pointer max-w-[136px]"
    >
      <img src={leftArrowIcon} alt="left arrow icon" />
      <span>Back</span>
    </Link>
  );

  useEffect(() => {
    const handleFetchCountry = async () => {
      try {
        const { data }: { data: Country[] } = await axios.get(
          `${API_BASE_URL}/alpha/${countryCode}`
        );
        setCountry(data[0]);
      } catch (error) {
        const errorMessage = axios.isAxiosError(error)
          ? `Failed to fetch country details: ${error.message}`
          : "An unexpected error occurred.";
        console.error("Error fetching country details:", error);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    handleFetchCountry();
  }, [countryCode]);

  useEffect(() => {
    const handleFetchBorders = async () => {
      if (country && country.borders && country.borders.length > 0) {
        try {
          const { data: borderData }: { data: Country[] } = await axios.get(
            `${API_BASE_URL}/alpha?codes=${country.borders.join(",")}`
          );
          const borderNames = borderData.map(
            (borderCountry) => borderCountry.name.common
          );
          setBorderCountries(borderNames);
        } catch (error) {
          console.error("Error fetching border countries:", error);
        }
      }
    };
    handleFetchBorders();
  }, [country]);

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

  if (error || !country) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-6">
        <p className="text-lg text-red-500">{error || "Country not found"}</p>
        <BackButton />
      </div>
    );
  }

  const nativeName =
    Object.values(country.name.nativeName || {})[0]?.common ||
    country.name.common;

  return (
    <div>
      <Header />
      <main className="pt-30 md:pt-40 px-7 md:px-20 space-y-[64px] md:space-y-20 pb-15">
        <BackButton />
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
                  <DetailItem
                    label="Capital"
                    value={country.capital?.[0] || "N/A"}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <DetailItem
                    label="Top Level Domain"
                    value={country.tld?.[0] || "N/A"}
                  />
                  <DetailItem
                    label="Currencies"
                    value={
                      country.currencies &&
                      Object.keys(country.currencies).length > 0
                        ? country.currencies[Object.keys(country.currencies)[0]]
                            .name
                        : "N/A"
                    }
                  />
                  <DetailItem
                    label="Languages"
                    value={
                      country.languages &&
                      Object.keys(country.languages).length > 0
                        ? Object.values(country.languages).sort().join(", ")
                        : "N/A"
                    }
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
                        className="truncate font-light text-sm px-5 py-1 bg-light-bg dark:bg-dark2-bg rounded-md shadow-sm text-center"
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
  );
};

export default CountryDetails;
