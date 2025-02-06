import { useState } from "react";
import css from "./TeacherCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateFavorites } from "../../redux/teachers/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import Modal from "../Modal/Modal";

export default function TeacherCard({
  item: {
    id,
    name,
    surname,
    languages,
    levels,
    rating,
    reviews,
    price_per_hour,
    lessons_done,
    avatar_url,
    lesson_info,
    conditions,
    experience,
  },
}) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [modalContent, setModalContent] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const handleHeight = () => {
    setReadMore((prev) => !prev);
  };
  const handleBooking = () => {
    setModalContent("booking form");
  };

  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.teachers);
  function toFavorites() {
    if (isLoggedIn) dispatch(updateFavorites(id));
    else
      setModalContent(
        "This service is available to registered users only. Sign in or register."
      );
  }
  return (
    <div
      className={`${css.cardContainer} ${readMore ? css.cardContainerFull : ""}`}
    >
      <div className={css.avatarWrp}>
        <img src={avatar_url} alt="Teacher's photo" className={css.avatar} />
      </div>
      <div>
        <div className={css.rightTop}>
          <span>Lessons online</span>
          <span className={css.splitter}></span>
          <span>Lessons done: {lessons_done}</span>
          <span className={css.splitter}></span>
          <span className={css.flexAlignCenter}>
            <svg className={css.starSvg}>
              <title>Current rating</title>
              <use href="/symbols.svg#icon-star"></use>
            </svg>
            Rating: {rating}
          </span>
          <span className={css.splitter}></span>
          <span>
            Price / 1 hour: <span className={css.green}>{price_per_hour}$</span>
          </span>
          <button className={css.favoritesBtn} onClick={toFavorites}>
            <svg
              className={`${css.heartSvg} ${favorites.includes(id) && css.inFavorites}`}
            >
              <title>Add camper to favorite</title>
              <use href="/symbols.svg#icon-heart"></use>
            </svg>
          </button>
        </div>
        <div className={css.grayPart}>Languages</div>
        <div className={css.title}>
          {name} {surname}
        </div>
        <div className={css.describeBlock}>
          <div>
            <span className={css.grayPart}>Speaks: </span>
            <span className={css.underline}>{languages.join(", ")}</span>
          </div>
          <div>
            <span className={css.grayPart}>Lesson Info: </span>
            {lesson_info}
          </div>
          <div>
            <span className={css.grayPart}>Conditions: </span>
            {conditions}
          </div>
        </div>

        {!readMore && (
          <button
            type="button"
            className={`${css.underline} ${css.readMoreBtn}`}
            onClick={handleHeight}
          >
            Read more
          </button>
        )}

        {readMore && <div className={css.experience}>{experience}</div>}

        {readMore && (
          <ul className={css.reviews}>
            {reviews.map(({ reviewer_name, reviewer_rating, comment }) => (
              <li className={css.reviewerLi} key={`${id}${reviewer_name}`}>
                <div className={css.reviewer_info}>
                  <div className={css.reviewer_avatar}></div>
                  <div>
                    <div className={css.reviewer}>{reviewer_name}</div>
                    <div className={`${css.flexAlignCenter} ${css.rating}`}>
                      <svg className={css.starSvg}>
                        <title>Current rating</title>
                        <use href="/symbols.svg#icon-star"></use>
                      </svg>

                      {reviewer_rating ? reviewer_rating.toFixed(1) : "unrated"}
                    </div>
                  </div>
                </div>
                <div className={css.comment}>{comment}</div>
              </li>
            ))}
          </ul>
        )}

        <ul className={css.levelsList}>
          {levels.map((level) => (
            <li key={`${id}${level}`}>
              <span className={css.level}>{level}</span>
            </li>
          ))}
        </ul>

        {readMore && (
          <button
            type="button"
            className={`btn ${css.bookingBtn}`}
            onClick={handleBooking}
          >
            Book trial lesson
          </button>
        )}
      </div>
      <Modal
        isOpen={modalContent !== false}
        onClose={() => setModalContent(false)}
      >
        {modalContent}
      </Modal>
    </div>
  );
}
