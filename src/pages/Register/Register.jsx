import { createUser, fetchUsers } from "../../api/users";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { ROUTES } from "../../routes/consts";
import styles from "./Register.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
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

      await createUser({ name, age, email, password });
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
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <Input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.fullWidth}
              required
            />
            <label htmlFor="age" className={styles.label}>
              Age
            </label>
            <Input
              type="number"
              id="age"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={styles.fullWidth}
              required
            />

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

            {emailError && <div className={styles.error}>{emailError}</div>}

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

            {passwordError && (
              <div className={styles.error}>{passwordError}</div>
            )}

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
            <div className={styles.buttons}>
              <div>
                <Button type="submit" className={styles.registerButton}>
                  Register
                </Button>
              </div>
            </div>
          </div>
          {confirmPasswordError && (
            <div className={styles.error}>{confirmPasswordError}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
