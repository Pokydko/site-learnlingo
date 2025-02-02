import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
// import css from "./Login.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      logIn({
        email: form.email.value,
        password: form.password.value,
      })
    );
    form.reset();
  };

  return (
    <div>
      <h2 className="modalTitle">Log In</h2>
      <p className="modalP">
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>
      <form onSubmit={handleLogin} autoComplete="off">
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit" className="btn modalBtn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
