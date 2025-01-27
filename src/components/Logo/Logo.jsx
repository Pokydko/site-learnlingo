import { NavLink } from "react-router-dom";
import css from "./Logo.module.css";

export default function Navigation() {
  return (
    <NavLink to="/" className={css.logo}>
      <svg className={css.logoSvg}>
        <title>LearnLingo UA</title>
        <use href="/symbols.svg#icon-ukraine"></use>
      </svg>
      LearnLingo
    </NavLink>
  );
}
