import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { ROUTES } from "../../routes/consts";
import styles from "./Login.module.scss";
import { fetchUsers } from "../../api/users";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

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
        console.log("User logged in successfully:", email);
        navigate(ROUTES.ORDERS);
      } else {
        console.error("User not found or invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
          <Button type="submit" className={styles.loginButton}>
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
