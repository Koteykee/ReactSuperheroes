import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import type { Superhero } from "../../../types/superhero.type";
import styles from "./MySuperheroesPage.module.css";
import { useUserStore } from "../../../stores/userStore";

export const MySuperheroesPage = () => {
  const navigate = useNavigate();

  const { currentUser } = useUserStore();

  const [superheroes, setSuperheroes] = useState<Superhero[]>(() => {
    if (!currentUser) return [];

    const data: Superhero[] = JSON.parse(
      localStorage.getItem("superheroes") || "[]"
    );

    return data.filter((hero) => hero.userId === currentUser.id);
  });

  const editHero = (id: Superhero["id"]) => {
    navigate(`/superheroform/${id}`);
  };

  const deleteHero = (id: Superhero["id"]) => {
    setSuperheroes((prev) => {
      const updated = prev.filter((hero) => hero.id !== id);
      localStorage.setItem("superheroes", JSON.stringify(updated));
      return updated;
    });
  };

  if (!superheroes) return <p>Superheroes not found.</p>;

  return (
    <div>
      <div className={styles["create-card"]}>
        <Link to={`/superheroform`} className={styles["create-box"]}>
          <span className={styles["plus"]}>+</span>
        </Link>
        <p className={styles["create-text"]}>Create new superhero</p>
      </div>
      <div className={styles["heroes-list"]}>
        {superheroes.map((superhero) => (
          <div key={superhero.id} className={styles["hero-wrapper"]}>
            <Link
              to={`/superhero/${superhero.id}`}
              className={styles["hero-card"]}
            >
              <span className={styles["hero-link"]}>{superhero.name}</span>
            </Link>
            <div className={styles["buttons-wrapper"]}>
              <button
                className={styles["edit"]}
                onClick={() => editHero(superhero.id)}
              >
                Edit
              </button>
              <button
                className={styles["delete"]}
                onClick={() => deleteHero(superhero.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
