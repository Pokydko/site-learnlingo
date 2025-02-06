import css from "./HeaderLogin.module.css";
import { useSelector, useDispatch } from "react-redux";
import { loadFavorites } from "../../redux/teachers/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import UserMenu from "../UserMenu/UserMenu.jsx";
import Modal from "../Modal/Modal";
import { useState, useEffect } from "react";
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx";

export default function HeaderLogin() {
  const [modalContent, setModalContent] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadFavorites());
    }
  }, [isLoggedIn, dispatch]);

  return (
    <div className={css.logReg}>
      {isLoggedIn ? (
        <UserMenu />
      ) : (
        <>
          <button
            type="button"
            className={css.log}
            onClick={() => {
              setModalContent(Login);
            }}
          >
            <svg className={css.loginSvg}>
              <title>Login to LearnLingo</title>
              <use href="/symbols.svg#icon-login"></use>
            </svg>
            Log in
          </button>
          <button
            type="button"
            className={`${css.btnBlack}`}
            onClick={() => {
              setModalContent(Register);
            }}
          >
            Registration
          </button>
          <Modal
            isOpen={modalContent !== false}
            onClose={() => setModalContent(false)}
          >
            {modalContent}
          </Modal>
        </>
      )}
    </div>
  );
}
