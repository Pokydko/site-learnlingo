import css from "./HeroAdvantages.module.css";
export default function HeroAdvantages() {
  const fiches = [
    { name: `Experienced tutors`, value: "32,000 +" },
    { name: `5-star tutor reviews`, value: "300,000 +" },
    { name: `Subjects taught`, value: "120 +" },
    { name: `Tutor nationalities`, value: "200 +" },
  ];
  return (
    <div className={css.HeroAdvantages}>
      {fiches.map(({ name, value }) => (
        <div key={(name, value)} className={css.fichaBox}>
          <span className={css.number}>{value}</span>
          <span className={css.ficha}>{name}</span>
        </div>
      ))}

      {/* custom border with color from variable --btn-color */}
      <svg className={css.border}>
        <use href="/symbols.svg#border"></use>
      </svg>
    </div>
  );
}
