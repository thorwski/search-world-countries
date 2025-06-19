import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import SearchInput from "../components/SearchInput";
import CountryCard from "../components/CountryCard";
import Filter from "../components/Filter";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Country } from "./Interface";
import { API_BASE_URL } from "../utils/api";

const INITIAL_COUNTRY_CODES = [
  "DEU",
  "USA",
  "BRA",
  "ISL",
  "AFG",
  "ALA",
  "ALB",
  "DZA",
];

const Home = () => {
  const navigate = useNavigate();
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [regionFilter, setRegionFilter] = useState<string>("");

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const getInitialCountries = (countries: Country[]) =>
    countries
      .filter((country) => INITIAL_COUNTRY_CODES.includes(country.cca3))
      .sort(
        (a, b) =>
          INITIAL_COUNTRY_CODES.indexOf(a.cca3) -
          INITIAL_COUNTRY_CODES.indexOf(b.cca3)
      );

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const { data }: { data: Country[] } = await axios.get(
          `${API_BASE_URL}/all?fields=name,flags,capital,region,population,cca3`
        );
        setAllCountries(data);
      } catch (err) {
        const errorMessage = axios.isAxiosError(err)
          ? `Failed to fetch countries: ${err.message}`
          : "An unexpected error occurred.";
        console.error("Error to load countries: ", err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    handleFetch();
  }, []);

  const displayCountries = useMemo(() => {
    if (!allCountries.length) return [];

    if (searchValue || regionFilter) {
      return allCountries
        .filter(
          (country) =>
            country.name.common
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
              .includes(
                searchValue
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase()
              ) && (regionFilter ? country.region === regionFilter : true)
        )
        .sort((a, b) => a.name.common.localeCompare(b.name.common));
    }
    return getInitialCountries(allCountries);
  }, [searchValue, regionFilter, allCountries]);

  const handleCardClick = (countryCode: string) => {
    navigate(`/country/${countryCode}`);
  };

  return (
    <div>
      <Header />
      <main className="pt-26 md:pt-32 px-4 md:px-20">
        <div className="flex flex-col md:flex-row gap-10 justify-between mb-12 max-w-[1280px] mx-auto">
          <SearchInput
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search for a country..."
          />
          <Filter
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            options={regions}
            placeholder="Filter by Region"
          />
        </div>
        {loading ? (
          <p className="text-center text-gray-500 dark:text-dark-text col-span-full text-lg">
            Loading countries...
          </p>
        ) : error ? (
          <p className="text-center text-red-500 col-span-full text-lg">
            {error}
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-12 gap-[75px] place-items-center max-w-[1280px] mx-auto">
            {displayCountries.length > 0 ? (
              displayCountries.map((country) => (
                <div
                  key={country.cca3}
                  className="w-full max-w-[264px] sm:max-h-[336px] cursor-pointer"
                  onClick={() => handleCardClick(country.cca3)}
                >
                  <CountryCard
                    flag={country.flags.png}
                    name={country.name.common}
                    population={country.population}
                    region={country.region}
                    capital={country.capital?.[0] || "N/A"}
                  />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-dark-text col-span-full text-lg">
                No countries found. Try another search.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
