import css from "./HeaderLogin.module.css";

export default function HeaderLogin() {
  return (
    <div className={css.logReg}>
      <button type="button" className={css.log}>
        <svg className={css.loginSvg}>
          <title>Login to LearnLingo</title>
          <use href="/symbols.svg#icon-login"></use>
        </svg>
        Log in
      </button>
      <button type="button" className={`${css.btnBlack}`}>
        Registration
      </button>
    </div>
  );
}
