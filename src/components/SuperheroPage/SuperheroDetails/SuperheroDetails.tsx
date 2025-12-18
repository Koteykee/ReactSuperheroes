import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSuperheroStore } from "../../../stores/superheroStore";

import type { Superhero } from "../../../types/superhero.type";
import styles from "./SuperheroDetails.module.css";

export const SuperheroDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [superhero, setSuperhero] = useState<Superhero | null>(null);
  const [isTitle, setIsTitle] = useState<string>("powerstats");

  const { loadSuperhero } = useSuperheroStore();

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        const parsedId = id.startsWith("local-") ? id : Number(id);
        const data = await loadSuperhero(parsedId);
        if (data) {
          setSuperhero(data);
        }
      } catch (error) {
        console.error("Failed to load superhero:", error);
      }
    };

    loadData();
  }, [id]);

  const toggleTitle = (val: string) => {
    setIsTitle(val);
  };

  if (!superhero) return <p>Superhero not found.</p>;

  return (
    <div className={styles["superhero-container"]}>
      <div className={styles["card-wrapper"]}>
        <div className={styles["superhero-wrapper"]}>
          {superhero.images?.lg && (
            <img src={superhero.images.lg} alt={superhero.name} />
          )}
          <p className={styles["name"]}>{superhero.name}</p>
        </div>
        <div className={styles["titles"]}>
          <h3
            className={`${styles["title"]} ${
              isTitle === "powerstats" ? styles["active"] : ""
            }`}
            onClick={() => toggleTitle("powerstats")}
          >
            Powerstats
          </h3>
          <h3
            className={`${styles["title"]} ${
              isTitle === "appearance" ? styles["active"] : ""
            }`}
            onClick={() => toggleTitle("appearance")}
          >
            Appearance
          </h3>
          <h3
            className={`${styles["title"]} ${
              isTitle === "biography" ? styles["active"] : ""
            }`}
            onClick={() => toggleTitle("biography")}
          >
            Biography
          </h3>
        </div>
        {isTitle === "powerstats" && (
          <div className={styles["powerstats"]}>
            <div className={styles["stat"]}>
              <p className={styles["stat-name"]}>Intelligence</p>
              <p className={styles["stat-info"]}>
                {superhero.powerstats.intelligence}
              </p>
            </div>
            <div className={styles["stat"]}>
              <p className={styles["stat-name"]}>Strength</p>
              <p className={styles["stat-info"]}>
                {superhero.powerstats.strength}
              </p>
            </div>
            <div className={styles["stat"]}>
              <p className={styles["stat-name"]}>Speed</p>
              <p className={styles["stat-info"]}>
                {superhero.powerstats.speed}
              </p>
            </div>
            <div className={styles["stat"]}>
              <p className={styles["stat-name"]}>Durability</p>
              <p className={styles["stat-info"]}>
                {superhero.powerstats.durability}
              </p>
            </div>
            <div className={styles["stat"]}>
              <p className={styles["stat-name"]}>Power</p>
              <p className={styles["stat-info"]}>
                {superhero.powerstats.power}
              </p>
            </div>
            <div className={styles["stat"]}>
              <p className={styles["stat-name"]}>Combat</p>
              <p className={styles["stat-info"]}>
                {superhero.powerstats.combat}
              </p>
            </div>
          </div>
        )}
        {isTitle === "appearance" && (
          <div className={styles["appearance"]}>
            <div className={styles["stat"]}>
              <p className={styles["stat-name"]}>Gender</p>
              <p className={styles["stat-info"]}>
                {superhero.appearance.gender}
              </p>
            </div>
            <div className={styles["stat"]}>
              <p className={styles["stat-name"]}>Race</p>
              <p className={styles["stat-info"]}>{superhero.appearance.race}</p>
            </div>
            <div className={styles["stat"]}>
              <p className={styles["stat-name"]}>Height</p>
              <p className={styles["stat-info"]}>
                {superhero.appearance.height[1]}
              </p>
            </div>
            <div className={styles["stat"]}>
              <p className={styles["stat-name"]}>Weight</p>
              <p className={styles["stat-info"]}>
                {superhero.appearance.weight[1]}
              </p>
            </div>
            <div className={styles["stat"]}>
              <p className={styles["stat-name"]}>Eye Color</p>
              <p className={styles["stat-info"]}>
                {superhero.appearance.eyeColor}
              </p>
            </div>
            <div className={styles["stat"]}>
              <p className={styles["stat-name"]}>Hair Color</p>
              <p className={styles["stat-info"]}>
                {superhero.appearance.hairColor}
              </p>
            </div>
          </div>
        )}
        {isTitle === "biography" && (
          <div className={styles["biography"]}>
            <p className={styles["biography-stat"]}>Full Name</p>
            <p className={styles["biography-info"]}>
              {superhero.biography.fullName}
            </p>
            <p className={styles["biography-stat"]}>Alter Egos</p>
            <p className={styles["biography-info"]}>
              {superhero.biography.alterEgos}
            </p>
            <p className={styles["biography-stat"]}>Aliases</p>
            <p className={styles["biography-info"]}>
              {superhero.biography.aliases.join(", ")}
            </p>
            <p className={styles["biography-stat"]}>Place Of Birth</p>
            <p className={styles["biography-info"]}>
              {superhero.biography.placeOfBirth}
            </p>
            <p className={styles["biography-stat"]}>First Appearance</p>
            <p className={styles["biography-info"]}>
              {superhero.biography.firstAppearance}
            </p>
            <p className={styles["biography-stat"]}>Publisher</p>
            <p className={styles["biography-info"]}>
              {superhero.biography.publisher}
            </p>
            <p className={styles["biography-stat"]}>Alignment</p>
            <p className={styles["biography-info"]}>
              {superhero.biography.alignment}
            </p>
            <p className={styles["biography-stat"]}>Occupation</p>
            <p className={styles["biography-info"]}>
              {superhero.work.occupation}
            </p>
            <p className={styles["biography-stat"]}>Base</p>
            <p className={styles["biography-info"]}>{superhero.work.base}</p>
            <p className={styles["biography-stat"]}>Group Affiliation</p>
            <p className={styles["biography-info"]}>
              {superhero.connections.groupAffiliation}
            </p>
            <p className={styles["biography-stat"]}>Relatives</p>
            <p className={styles["biography-info"]}>
              {superhero.connections.relatives}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
