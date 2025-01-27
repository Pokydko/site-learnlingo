import { Link } from "react-router-dom";
import DynamicImage from "../components/DynamicImage/DynamicImage.jsx";
import css from "./NotFoundPage.module.css";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", fontSize: 32 }}>
      <div className={css.notFoundMsg}>
        <Link to="/">
          <h1>404</h1>
        </Link>
      </div>
      <div className={css.imgWrp}>
        <DynamicImage />
      </div>
    </div>
  );
};
export default NotFound;
