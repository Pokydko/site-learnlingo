import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./Register.module.css";

const Register = () => {
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    dispatch(
      register({
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
      })
    );

    form.reset();
  };

  return (
    <div>
      <h2 className="modalTitle">Register</h2>
      <p className="modalP">
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>
      <form className={css.form} onSubmit={handleRegister} autoComplete="off">
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit" className="btn modalBtn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
