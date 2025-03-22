import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import SearchInput from "../components/SearchInput";
import CountryCard from "../components/CountryCard";
import Filter from "../components/Filter";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Country } from "./Interface";

const Home = () => {
  const navigate = useNavigate();
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [displayCountries, setDisplayCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [regionFilter, setRegionFilter] = useState<string>("");

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const initialCountryCodes = useMemo(
    () => ["DEU", "USA", "BRA", "ISL", "AFG", "ALA", "ALB", "DZA"],
    []
  );

  const handleCardClick = (countryCode: string) => {
    navigate(`/country/${countryCode}`);
  };

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const URL = "https://restcountries.com/v3.1/all";
        setLoading(true);
        const { data }: { data: Country[] } = await axios.get(URL);

        setAllCountries(data);

        const initialCountries = data.filter((country: Country) =>
          initialCountryCodes.includes(country.cca3)
        );

        initialCountries.sort(
          (a, b) =>
            initialCountryCodes.indexOf(a.cca3) -
            initialCountryCodes.indexOf(b.cca3)
        );

        setDisplayCountries(initialCountries);
      } catch (err) {
        console.error("Error to load countries: ", err);
        setError("Error to load countries.");
      } finally {
        setLoading(false);
      }
    };

    handleFetch();
  }, [initialCountryCodes]);

  useEffect(() => {
    if (!allCountries.length) return;

    if (searchValue || regionFilter) {
      const filtered = allCountries.filter(
        (country) =>
          country.name.common
            .toLowerCase()
            .includes(searchValue.toLowerCase()) &&
          (regionFilter ? country.region === regionFilter : true)
      );
      filtered.sort((a, b) => a.name.common.localeCompare(b.name.common));
      setDisplayCountries(filtered);
    } else {
      const initialCountries = allCountries.filter((country) =>
        initialCountryCodes.includes(country.cca3)
      );
      initialCountries.sort(
        (a, b) =>
          initialCountryCodes.indexOf(a.cca3) -
          initialCountryCodes.indexOf(b.cca3)
      );
      setDisplayCountries(initialCountries);
    }
  }, [searchValue, regionFilter, allCountries, initialCountryCodes]);

  return (
    <div>
      <Header />
      <main className="pt-26 md:pt-32 px-4 md:px-20">
        <div className="flex flex-col md:flex-row gap-10 justify-between mb-12">
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-8 pb-12 md:px-0 gap-12 place-items-center">
            {displayCountries.length > 0 ? (
              displayCountries.map((country) => (
                <div
                  key={country.cca3}
                  className="sm:max-w-[300px] w-full cursor-pointer"
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
