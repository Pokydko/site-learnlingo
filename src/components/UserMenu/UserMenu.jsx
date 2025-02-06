import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOut } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import css from "./UserMenu.module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={css.wrapper}>
      <p className={css.username}>Hi, {user ? user.name : "student"}!</p>
      <div className={css.dropdown}>
        <NavLink to="/favorites" className={css.favoritesLink}>
          Favorites
        </NavLink>
        <button type="button" onClick={() => dispatch(logOut())}>
          Logout
        </button>
      </div>
    </div>
  );
}
