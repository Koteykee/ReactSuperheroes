import { useRef, useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useSuperheroStore } from "../../stores/superheroStore";

import type { Superhero } from "../../types/superhero.type";
import searchIcon from "../../assets/icons/search.svg";
import styles from "./Search.module.css";

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Superhero[] | null>(null);
  const [searchError, setSearchError] = useState<boolean>(false);

  const queryTimeout = useRef<number | null>(null);

  const { fetchSuperheroes } = useSuperheroStore();

  const getResults = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (queryTimeout.current) clearTimeout(queryTimeout.current);

    queryTimeout.current = setTimeout(async () => {
      if (value.trim() !== "") {
        try {
          const result = await fetchSuperheroes();

          if (result) {
            const filtered = result.filter((superhero) =>
              superhero.name.toLowerCase().includes(value.toLowerCase())
            );

            setSearchResults(filtered);
            setSearchError(false);
          }
        } catch {
          setSearchError(true);
        }
        return;
      }
      setSearchResults(null);
    }, 300);
  };

  const getSuperhero = () => {
    setSearchResults(null);
    setSearchQuery("");
  };

  return (
    <div className={styles["search-wrapper"]}>
      <div className={styles["input-wrapper"]}>
        <input
          type="text"
          value={searchQuery}
          onChange={getResults}
          placeholder="Search for superhero"
          className={styles["search"]}
        />
        <img src={searchIcon} alt="Search" className={styles["search-icon"]} />
      </div>
      {searchResults && (
        <ul className={styles["superhero-container"]}>
          {searchError && (
            <p className={styles["error"]}>
              Sorry, something went wrong, please try again.
            </p>
          )}
          {!searchError && searchResults.length === 0 && (
            <p className={styles["error"]}>No results found.</p>
          )}
          {!searchError &&
            searchResults.map((superhero) => (
              <li
                key={superhero.id}
                onClick={getSuperhero}
                className={styles["superhero"]}
              >
                <Link
                  to={`/superhero/${superhero.id}`}
                  className={styles["superhero-inner"]}
                >
                  {superhero.name}
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
