import { Link } from "react-router-dom";

// import styles from "./NavBar.module.css";

export const NavBar = () => {
  return (
    <nav>
      <Link to="/">
        <h1>Superhero Wiki</h1>
      </Link>
    </nav>
  );
};
