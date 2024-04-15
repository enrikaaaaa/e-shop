import { useContext, useState } from "react";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { ROUTES } from "../../routes/consts";
import { UserContext } from "../../contexts/UserContext/UserContext";
import { fetchUsers } from "../../api/users";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      return;
    }

    try {
      const users = await fetchUsers();
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        navigate(ROUTES.ORDERS);
      } else {
        alert("User not found or invalid credentials");
      }
    } catch (error) {
      alert("Error logging in: " + error);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleClickButton = async () => {
    try {
      const users = await fetchUsers();
      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );
      if (foundUser) {
        handleLogin(foundUser);
        alert("User logged in successfully: " + foundUser.name);
        navigate(ROUTES.ORDERS);
      } else {
        alert("User not found or invalid credentials");
      }
    } catch (error) {
      alert("Error logging in: " + error);
    }
  };

  return (
    <div className={styles.containerLogin}>
      <div className={styles.formContainer}>
        <div className={styles.formTitle}>Login</div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.fullWidth}
            required
          />
          {emailError && <div className={styles.error}>{emailError}</div>}
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.fullWidth}
            required
          />
          {passwordError && <div className={styles.error}>{passwordError}</div>}
          <Button
            type="submit"
            className={styles.loginButton}
            onClick={handleClickButton}
          >
            Log In
          </Button>
          <div className={`${styles.form} ${styles.registerContainer}`}>
            <h5>Not registered?</h5>
            <Button
              className={styles.registerButton}
              onClick={() => navigate(ROUTES.REGISTER)}
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
