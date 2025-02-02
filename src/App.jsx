import "./App.css";
import { useEffect, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "./components/Layout";
import { PrivateRoute } from "./components/PrivateRoute";
import { refreshUser } from "./redux/auth/operations";
import { selectIsRefreshing } from "./redux/auth/selectors";

const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const TeachersPage = lazy(() => import("./pages/TeachersPage"));

export default function App() {
  // const location = useLocation();
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) return <p>Loading...</p>;

  const observer = new ResizeObserver(() => {
    const htmlElement = document.documentElement;
    let scrollbarWidth = window.innerWidth - htmlElement.clientWidth;
    if (scrollbarWidth)
      htmlElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
    else htmlElement.style.setProperty("--scrollbar-width", `0px`);
  });
  observer.observe(document.documentElement);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route
          path="/favorites"
          element={
            //
            <PrivateRoute redirectTo="/teachers" component={<TeachersPage />} />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
