import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

const buildLinkClass = ({ isActive }) => {
  return `${css.link} ${isActive && css.active}`;
};

export default function Navigation() {
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={buildLinkClass}>
        Home
      </NavLink>
      <NavLink to="/teachers" className={buildLinkClass}>
        Teachers
      </NavLink>
    </nav>
  );
}
