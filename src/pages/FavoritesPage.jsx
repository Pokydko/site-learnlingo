import css from "./TeachersPage.module.css";
import SimpleList from "../components/SimpleList/SimpleList";
import TeacherCard from "../components/TeacherCard/TeacherCard";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachersData } from "../redux/teachers/operations";

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const { favorites, loading } = useSelector((state) => state.teachers);
  const [cachedFavorites, setCachedFavorites] = useState([]);

  const isMounted = useRef(false); // to avoid twice-fetching
  useEffect(() => {
    if (isMounted.current) return; // useRef for StrictMode
    isMounted.current = true; // to avoid twice-fetching
    const favoritesToFetch = favorites.filter(
      (id) => !cachedFavorites.some((teacher) => teacher.id === id)
    );

    if (favoritesToFetch.length > 0) {
      dispatch(fetchTeachersData({ favorites: favorites })).then((result) => {
        setCachedFavorites((prev) => [...prev, ...result.payload.favorites]);
      });
    }
  }, [dispatch, favorites, cachedFavorites]);

  return (
    <div className={css.teachersPage}>
      {loading && <p>Loading your favorites</p>}
      {favorites && (
        <SimpleList
          show={cachedFavorites}
          handlePagination={null}
          Card={TeacherCard}
        />
      )}
    </div>
  );
}
