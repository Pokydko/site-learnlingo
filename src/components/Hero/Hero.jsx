import css from "./Hero.module.css";
import "./HeroGlobalStyles.css";

import DynamicImage from "../DynamicImage/DynamicImage.jsx";
import { NavLink } from "react-router-dom";

export default function Hero() {
  return (
    <div className={css.heroSection}>
      <div className={css.heroStart}>
        <h1 className={css.heroTitle}>
          Unlock your potential with the best{" "}
          <span className={css.italic}>language</span> tutors
        </h1>
        <p className={css.heroP}>
          Embark on an Exciting Language Journey with Expert Language Tutors:
          Elevate your language proficiency to new heights by connecting with
          highly qualified and experienced tutors.
        </p>
        <NavLink to="/teachers" className="btn">
          Get started
        </NavLink>
      </div>
      <DynamicImage />
    </div>
  );
}
