import "./App.css";
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
// import RingLoader from "react-spinners/RingLoader";
import Logo from "./components/Logo/Logo";
import HeaderLogin from "./components/HeaderLogin/HeaderLogin";
import Navigation from "./components/Navigation/Navigation";
// import CamperFeatures from "./components/CamperFeatures/CamperFeatures";
// import CamperReviews from "./components/CamperReviews/CamperReviews";

const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const TeachersPage = lazy(() => import("./pages/TeachersPage"));

// const CamperDetailsPage = lazy(() => import("./pages/CamperDetailsPage"));

export default function App() {
  // const location = useLocation();

  const observer = new ResizeObserver(() => {
    // console.log("observe");

    const htmlElement = document.documentElement;
    let scrollbarWidth = window.innerWidth - htmlElement.clientWidth;
    if (scrollbarWidth)
      htmlElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
    else {
      htmlElement.style.setProperty("--scrollbar-width", `0px`);
    }
  });
  observer.observe(document.documentElement);

  return (
    <>
      <header className="disable-scrollbars">
        <div className="headerContainer">
          <Logo />
          <Navigation />
          <HeaderLogin />
        </div>
      </header>
      <main>
        <Suspense
          fallback={
            "loading..."
            // <RingLoader
            //   color="#909080ff"
            //   size={40}
            //   aria-label="Loading Spinner"
            //   loading={true}
            //   cssOverride={{
            //     margin: "0 auto",
            //   }}
            // />
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            {/* <Route
              path="/catalog/:id"
              state={location}
              element={<CamperDetailsPage />}
            >
              <Route
                path="features"
                state={location}
                element={<CamperFeatures />}
              />
              <Route
                path="reviews"
                state={location}
                element={<CamperReviews />}
              />
            </Route> */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}
