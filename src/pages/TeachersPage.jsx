import css from "./TeachersPage.module.css";
import TeachersList from "../components/TeachersList/TeachersList";

export default function TeachersPage() {
  return (
    <div className={css.teachersPage}>
      {/* filters */}
      <TeachersList />
    </div>
  );
}
