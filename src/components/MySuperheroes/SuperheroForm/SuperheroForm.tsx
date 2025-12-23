import { useEffect, useId } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "../../../stores/userStore";

import {
  superheroSchema,
  type SuperheroFormData,
} from "./SuperheroForm.schema";
import type { Superhero } from "../../../types/superhero.type";
import styles from "./SuperheroForm.module.css";

export const SuperheroForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SuperheroFormData>({
    resolver: zodResolver(superheroSchema),
    defaultValues: { alignment: "" },
  });

  const { id: heroId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { currentUser } = useUserStore();

  const localId = useId();

  useEffect(() => {
    if (!heroId) return;

    const superheroes = JSON.parse(localStorage.getItem("superheroes") || "[]");
    const hero = superheroes.find((h: Superhero) => h.id === heroId);

    if (!hero) return;

    reset({
      name: hero.name,
      image: hero.images.lg,

      intelligence: hero.powerstats.intelligence,
      strength: hero.powerstats.strength,
      speed: hero.powerstats.speed,
      durability: hero.powerstats.durability,
      power: hero.powerstats.power,
      combat: hero.powerstats.combat,

      gender: hero.appearance.gender,
      race: hero.appearance.race,
      height: Number(hero.appearance.height[1].replace(" cm", "")),
      weight: Number(hero.appearance.weight[1].replace(" kg", "")),
      eyeColor: hero.appearance.eyeColor,
      hairColor: hero.appearance.hairColor,

      fullName: hero.biography.fullName,
      placeOfBirth: hero.biography.placeOfBirth,
      alignment: hero.biography.alignment,
      occupation: hero.work.occupation,
    });
  }, [heroId, reset]);

  const onSubmit = (data: SuperheroFormData) => {
    const superheroes: Superhero[] = JSON.parse(
      localStorage.getItem("superheroes") || "[]"
    );

    const newHero: Superhero = {
      id: heroId || "local-" + localId,
      userId: currentUser!.id,
      name: data.name,
      powerstats: {
        intelligence: data.intelligence,
        strength: data.strength,
        speed: data.speed,
        durability: data.durability,
        power: data.power,
        combat: data.combat,
      },
      appearance: {
        gender: data.gender,
        race: data.race,
        height: ["", `${data.height} cm`],
        weight: ["", `${data.weight} kg`],
        eyeColor: data.eyeColor,
        hairColor: data.hairColor,
      },
      biography: {
        fullName: data.fullName,
        placeOfBirth: data.placeOfBirth,
        alignment: data.alignment,
        alterEgos: "None",
        aliases: ["None"],
        firstAppearance: "-",
        publisher: "You",
      },
      work: {
        occupation: data.occupation,
        base: "-",
      },
      connections: {
        groupAffiliation: "-",
        relatives: "-",
      },
      images: {
        lg: `${data.image}`,
      },
    };

    if (heroId) {
      const index = superheroes.findIndex((s: Superhero) => s.id === heroId);
      if (index !== -1) {
        superheroes[index] = newHero;
      }
    } else {
      superheroes.push(newHero);
    }

    localStorage.setItem("superheroes", JSON.stringify(superheroes));

    navigate(`/superhero/${newHero.id}`);
  };

  return (
    <div className={styles["wrapper"]}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Create your superhero!</h3>
        <div className={styles["main-field"]}>
          <label htmlFor="name" className={styles["main-name"]}>
            Superhero name
          </label>
          <input
            type="text"
            id="name"
            className={styles["main-input"]}
            {...register("name")}
          />
          {errors.name && (
            <p className={styles["error"]}>{errors.name.message}</p>
          )}
        </div>
        <div className={styles["main-field"]}>
          <label htmlFor="image" className={styles["main-name"]}>
            Superhero image
          </label>
          <input
            type="text"
            id="image"
            className={styles["main-input"]}
            {...register("image", {
              setValueAs: (v) => (v === "" ? undefined : v),
            })}
          />
          {errors.image && (
            <p className={styles["error"]}>{errors.image.message}</p>
          )}
        </div>
        <p className={styles["sub-title"]}>Powerstats</p>
        <div className={styles["container"]}>
          <div className={styles["stat"]}>
            <label htmlFor="intelligence" className={styles["title"]}>
              Intelligence
            </label>
            <input
              type="number"
              id="intelligence"
              min="1"
              max="100"
              step="1"
              {...register("intelligence", {
                valueAsNumber: true,
              })}
              className={styles["input"]}
            />
            {errors.intelligence && (
              <p className={styles["error"]}>{errors.intelligence.message}</p>
            )}
          </div>
          <div className={styles["stat"]}>
            <label htmlFor="strength" className={styles["title"]}>
              Strength
            </label>
            <input
              type="number"
              id="strength"
              min="1"
              max="100"
              step="1"
              {...register("strength", {
                valueAsNumber: true,
              })}
              className={styles["input"]}
            />
            {errors.strength && (
              <p className={styles["error"]}>{errors.strength.message}</p>
            )}
          </div>
          <div className={styles["stat"]}>
            <label htmlFor="speed" className={styles["title"]}>
              Speed
            </label>
            <input
              type="number"
              id="speed"
              min="1"
              max="100"
              step="1"
              {...register("speed", {
                valueAsNumber: true,
              })}
              className={styles["input"]}
            />
            {errors.speed && (
              <p className={styles["error"]}>{errors.speed.message}</p>
            )}
          </div>
          <div className={styles["stat"]}>
            <label htmlFor="durability" className={styles["title"]}>
              Durability
            </label>
            <input
              type="number"
              id="durability"
              min="1"
              max="100"
              step="1"
              {...register("durability", {
                valueAsNumber: true,
              })}
              className={styles["input"]}
            />
            {errors.durability && (
              <p className={styles["error"]}>{errors.durability.message}</p>
            )}
          </div>
          <div className={styles["stat"]}>
            <label htmlFor="power" className={styles["title"]}>
              Power
            </label>
            <input
              type="number"
              id="power"
              min="1"
              max="100"
              step="1"
              {...register("power", {
                valueAsNumber: true,
              })}
              className={styles["input"]}
            />
            {errors.power && (
              <p className={styles["error"]}>{errors.power.message}</p>
            )}
          </div>
          <div className={styles["stat"]}>
            <label htmlFor="combat" className={styles["title"]}>
              Combat
            </label>
            <input
              type="number"
              id="combat"
              min="1"
              max="100"
              step="1"
              {...register("combat", {
                valueAsNumber: true,
              })}
              className={styles["input"]}
            />
            {errors.combat && (
              <p className={styles["error"]}>{errors.combat.message}</p>
            )}
          </div>
        </div>
        <p className={styles["sub-title"]}>Appearance</p>
        <div className={styles["container"]}>
          <div>
            <label htmlFor="gender" className={styles["title"]}>
              Gender
            </label>
            <input
              {...register("gender")}
              type="text"
              id="gender"
              className={styles["text-input"]}
            />
            {errors.gender && (
              <p className={styles["error"]}>{errors.gender.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="race" className={styles["title"]}>
              Race
            </label>
            <input
              {...register("race")}
              type="text"
              id="race"
              className={styles["text-input"]}
            />
            {errors.race && (
              <p className={styles["error"]}>{errors.race.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="height" className={styles["title"]}>
              Height
            </label>
            <input
              type="number"
              id="height"
              min="1"
              step="1"
              {...register("height", {
                valueAsNumber: true,
              })}
              className={styles["input"]}
            />
            {errors.height && (
              <p className={styles["error"]}>{errors.height.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="weight" className={styles["title"]}>
              Weight
            </label>
            <input
              type="number"
              id="weight"
              min="1"
              step="1"
              {...register("weight", {
                valueAsNumber: true,
              })}
              className={styles["input"]}
            />
            {errors.weight && (
              <p className={styles["error"]}>{errors.weight.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="eyeColor" className={styles["title"]}>
              Eye Color
            </label>
            <input
              {...register("eyeColor")}
              type="text"
              id="eyeColor"
              className={styles["text-input"]}
            />
            {errors.eyeColor && (
              <p className={styles["error"]}>{errors.eyeColor.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="hairColor" className={styles["title"]}>
              Hair Color
            </label>
            <input
              {...register("hairColor")}
              type="text"
              id="hairColor"
              className={styles["text-input"]}
            />
            {errors.hairColor && (
              <p className={styles["error"]}>{errors.hairColor.message}</p>
            )}
          </div>
        </div>
        <p className={styles["sub-title"]}>Biography</p>
        <div className={styles["biography-container"]}>
          <div className={styles["biography-stat"]}>
            <label htmlFor="fullName" className={styles["main-name"]}>
              Full Name
            </label>
            <input
              {...register("fullName")}
              type="text"
              id="fullName"
              className={styles["main-input"]}
            />
            {errors.fullName && (
              <p className={styles["error"]}>{errors.fullName.message}</p>
            )}
          </div>
          <div className={styles["biography-stat"]}>
            <label htmlFor="placeOfBirth" className={styles["main-name"]}>
              Place Of Birth
            </label>
            <input
              {...register("placeOfBirth")}
              type="text"
              id="placeOfBirth"
              className={styles["main-input"]}
            />
            {errors.placeOfBirth && (
              <p className={styles["error"]}>{errors.placeOfBirth.message}</p>
            )}
          </div>
          <div className={styles["biography-stat"]}>
            <label htmlFor="alignment" className={styles["main-name"]}>
              Alignment
            </label>
            <select
              {...register("alignment")}
              id="alignment"
              className={styles["select"]}
            >
              <option disabled value="">
                Select alignment
              </option>
              <option value="good">Good</option>
              <option value="bad">Bad</option>
            </select>
            {errors.alignment && (
              <p className={styles["error"]}>{errors.alignment.message}</p>
            )}
          </div>
          <div className={styles["biography-stat"]}>
            <label htmlFor="occupation" className={styles["main-name"]}>
              Occupation
            </label>
            <input
              {...register("occupation")}
              type="text"
              id="occupation"
              className={styles["main-input"]}
            />
            {errors.occupation && (
              <p className={styles["error"]}>{errors.occupation.message}</p>
            )}
          </div>
        </div>
        <button className={styles["button"]}>
          {heroId ? "Edit superhero" : "Create superhero"}
        </button>
      </form>
    </div>
  );
};
