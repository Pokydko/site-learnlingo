import { useSelector } from "react-redux";
import css from "./SimpleList.module.css";

export default function SimpleList({ show, handlePagination, Card }) {
  const { isThereMore = true, loading } = useSelector(
    (state) => state.teachers
  );

  return (
    <div className={css.catalogContainer}>
      <ul className={css.catalogList}>
        {show.map((element) => {
          return (
            <li key={element.id} className={css.catalogItem}>
              <Card item={element} />
            </li>
          );
        })}
      </ul>
      {!handlePagination
        ? null
        : isThereMore && (
            <button className={`btn ${css.center}`} onClick={handlePagination}>
              {loading ? "Loading..." : "Load more"}
            </button>
          )}
    </div>
  );
}
