import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { ROUTES } from "../../routes/consts";
import styles from "./Register.module.scss";
import { fetchUsers, createUser } from "../../api/users";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

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

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    try {
      const users = await fetchUsers();
      const emailExists = users.some((user) => user.email === email);
      if (emailExists) {
        setEmailError("Email already exists");
        return;
      }

      await createUser({ email, password });
      console.log("User registered successfully:", email);
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className={styles.containerRegister}>
      <div className={styles.formContainer}>
        <div className={styles.formTitle}>Register</div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.fullWidth}
              required
            />
          </div>
          {emailError && <div className={styles.error}>{emailError}</div>}
          <div className={styles.inputContainer}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.fullWidth}
              required
            />
          </div>
          {passwordError && <div className={styles.error}>{passwordError}</div>}
          <div className={styles.inputContainer}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.fullWidth}
              required
            />
          </div>
          {confirmPasswordError && (
            <div className={styles.error}>{confirmPasswordError}</div>
          )}
          <div className={styles.buttons}>
            <div>
              <Button type="submit" className={styles.registerButton}>
                Register
              </Button>
            </div>
            <div>
              <Button
                className={styles.registerButton}
                onClick={() => navigate(ROUTES.LOGIN)}
              >
                Log In
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
