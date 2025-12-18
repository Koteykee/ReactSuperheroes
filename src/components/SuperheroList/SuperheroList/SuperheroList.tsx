import { useEffect, useState } from "react";
import { useSuperheroStore } from "../../../stores/superheroStore";

import { SuperheroListItem } from "../SuperheroListItem/SuperheroListItem";
import type { Superhero } from "../../../types/superhero.type";
import styles from "./SuperheroList.module.css";

export const SuperheroList = () => {
  const [superheroes, setSuperheroes] = useState<Superhero[] | null>(null);

  const { fetchSuperheroes } = useSuperheroStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSuperheroes();
        if (data) {
          setSuperheroes(data);
        }
      } catch (error) {
        console.error("Failed to load cats:", error);
      }
    };

    loadData();
  }, []);

  if (!superheroes) return <p>Superheroes not found.</p>;

  return (
    <ul className={styles["superhero-container"]}>
      {superheroes.map((superhero) => (
        <li key={superhero.id}>
          <SuperheroListItem superhero={superhero} />
        </li>
      ))}
    </ul>
  );
};
