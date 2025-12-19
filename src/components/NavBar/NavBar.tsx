import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import { Search } from "../Search/Search";

import styles from "./NavBar.module.css";
import menuIcon from "../../assets/icons/menu.svg";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const { currentUser, loadFromStorage, logoutUser } = useUserStore();

  const navigate = useNavigate();

  useEffect(() => {
    loadFromStorage();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const goMainPage = () => {
    navigate("/");
  };

  const handleLogout = () => {
    logoutUser();
    toggleMenu();
    goMainPage();
  };

  return (
    <nav className={styles["nav-bar"]}>
      <Link to="/">
        <h2 className={styles["title"]}>Superheroes</h2>
      </Link>
      <Search />
      {!currentUser && (
        <Link to="/signin" className={styles["sign-in"]}>
          <h2 className={styles["title"]}>Sign In</h2>
        </Link>
      )}
      {currentUser && (
        <div className={styles["menu-wrapper-container"]}>
          <div className={styles["menu-wrapper"]}>
            <img
              src={menuIcon}
              alt="Menu"
              className={styles["menu-icon"]}
              onClick={toggleMenu}
            />
            <h3 className={styles["currentUser"]} onClick={toggleMenu}>
              {currentUser.username}
            </h3>
          </div>

          {isMenuOpen && (
            <ul className={styles["menu-container"]}>
              <li className={styles["menu-item"]}>
                <Link
                  to={`/mysuperheroes`}
                  className={styles["menu-inner"]}
                  onClick={toggleMenu}
                >
                  My superheroes
                </Link>
              </li>
              <li className={styles["menu-item"]}>
                <p onClick={handleLogout} className={styles["menu-inner"]}>
                  Log Out
                </p>
              </li>
            </ul>
          )}
        </div>
      )}
    </nav>
  );
};
