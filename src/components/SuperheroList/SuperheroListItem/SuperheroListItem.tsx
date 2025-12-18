import { Link } from "react-router-dom";

import type { Superhero } from "../../../types/superhero.type";
import styles from "./SuperheroListItem.module.css";

interface SuperheroListItemProps {
  superhero: Superhero;
}

export const SuperheroListItem = ({ superhero }: SuperheroListItemProps) => {
  return (
    <div className={styles["superhero-card"]}>
      <Link to={`/superhero/${superhero.id}`}>
        <img
          src={superhero.images.md}
          alt={superhero.name}
          className={styles["superhero-img"]}
        />
        <p className={styles["superhero-name"]}>{superhero.name}</p>
      </Link>
    </div>
  );
};
