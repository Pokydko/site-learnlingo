import css from "./HomePage.module.css";
import Hero from "../components/Hero/Hero.jsx";
import HeroAdvantages from "../components/HeroAdvantages/HeroAdvantages.jsx";
export default function Home() {
  return (
    <div className={css.heroPage}>
      <Hero />
      <HeroAdvantages />
    </div>
  );
}
