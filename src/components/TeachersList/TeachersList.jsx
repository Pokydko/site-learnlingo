import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import css from "./TeachersList.module.css";

import { fetchTeachersData } from "../../redux/teachers/operations";
import TeacherCard from "../TeacherCard/TeacherCard";
import SimpleList from "../SimpleList/SimpleList";

// import {
//   initializeFilters,
// } from "../../redux/campers/slice.js";

export default function TeachersList() {
  const dispatch = useDispatch();
  const { teachers, filters, loading } = useSelector((state) => state.teachers);

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePage = () => {
    dispatch(fetchTeachersData(searchParams));
  };

  useEffect(() => {
    const params = Object.fromEntries(new URLSearchParams(location.search));
    // dispatch(refreshTeachers());
    // dispatch(initializeFilters(params));
  }, [dispatch, location.search]);

  const isMounted = useRef(false); // to avoid twice-fetching
  useEffect(() => {
    if (isMounted.current) return; // useRef for StrictMode
    isMounted.current = true; // to avoid twice-fetching
    if (teachers.length === 0) dispatch(fetchTeachersData(searchParams));
  }, [dispatch, searchParams]);

  useEffect(() => {
    setSearchParams(filters, { replace: true });
    // navigate(
    //   {
    //     pathname: location.pathname,
    //     search: query,
    //   },
    //   { replace: true }
    // );
  }, [
    dispatch,
    navigate,
    setSearchParams,
    searchParams,
    filters,
    teachers.length,
    location.pathname,
  ]);

  if (!loading && teachers.length === 0)
    return (
      <div className={css.notFoundCampers}>
        Unfortunately, we haven`t such teacher in our team.
      </div>
    );

  return (
    <div>
      <SimpleList
        show={teachers}
        handlePagination={handlePage}
        Card={TeacherCard}
      />
    </div>
  );
}
