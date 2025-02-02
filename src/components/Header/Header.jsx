import "./Header.css";
import Logo from "../Logo/Logo";
import HeaderLogin from "../HeaderLogin/HeaderLogin";
import Navigation from "../Navigation/Navigation";

export const Header = () => {
  return (
    <header className="disable-scrollbars">
      <div className="headerContainer">
        <Logo />
        <Navigation />
        <HeaderLogin />
      </div>
    </header>
  );
};
