import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";

import { loginSchema, type LoginFormData } from "./Login.schema";
import {
  registrationSchema,
  type RegistrationFormData,
} from "./Registration.schema";
import styles from "./Signin.module.css";

export const Signin = () => {
  const {
    register: loginRegister,
    handleSubmit: loginHandleSubmit,
    reset: loginReset,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const {
    register: registrationRegister,
    handleSubmit: registrationHandleSubmit,
    reset: registrationReset,
    formState: { errors: registrationErrors },
    watch,
    trigger,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  const { userList, registerUser, loginUser } = useUserStore();

  const [mode, setMode] = useState<"login" | "registration">("login");
  const [error, setError] = useState<string>("");

  const localId = useId();

  const passwordValue = watch("password");

  useEffect(() => {
    trigger(["password"]);
  }, [passwordValue]);

  const toggleMode = (val: "login" | "registration") => {
    setError("");

    if (val === "login") {
      registrationReset();
    } else {
      loginReset();
    }

    setMode(val);
  };

  const onRegistration = (data: RegistrationFormData) => {
    const existingUser = userList.find(
      (user) =>
        user.username.toLowerCase() === data.username.toLowerCase() ||
        user.email.toLowerCase() === data.email.toLowerCase()
    );

    if (existingUser) {
      setError("User with this username or email already exists");
      return;
    }

    setError("");

    const newUser = {
      id: localId,
      username: data.username,
      email: data.email,
      password: data.password,
    };

    registerUser(newUser);

    navigate("/");
  };

  const onLogin = (data: LoginFormData) => {
    const loginValue = data.login.toLowerCase();

    const user = userList.find(
      (u) =>
        u.username.toLowerCase() === loginValue ||
        u.email.toLowerCase() === loginValue
    );

    if (!user) {
      setError("User does not exist");
      return;
    }

    if (user.password !== data.password) {
      setError("Incorrect password");
      return;
    }

    setError("");

    loginUser(user);

    navigate("/");
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["titles"]}>
        <h3
          className={`${styles.title} ${
            mode === "registration" ? styles.active : ""
          }`}
          onClick={() => toggleMode("registration")}
        >
          Sign up
        </h3>
        <h3
          className={`${styles.title} ${mode === "login" ? styles.active : ""}`}
          onClick={() => toggleMode("login")}
        >
          Log in
        </h3>
      </div>
      {mode === "registration" && (
        <form onSubmit={registrationHandleSubmit(onRegistration)}>
          <div className={styles["wrapper"]}>
            <div className={styles["field"]}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                {...registrationRegister("username")}
              />
              {registrationErrors.username && (
                <p className={styles["error"]}>
                  {registrationErrors.username.message}
                </p>
              )}
            </div>
            <div className={styles["field"]}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                {...registrationRegister("email")}
              />
              {registrationErrors.email && (
                <p className={styles["error"]}>
                  {registrationErrors.email.message}
                </p>
              )}
            </div>
            <div className={styles["field"]}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...registrationRegister("password")}
              />
              {registrationErrors.password && (
                <p className={styles["error"]}>
                  {registrationErrors.password.message}
                </p>
              )}
            </div>
            <div className={styles["field"]}>
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                type="password"
                id="confirmPassword"
                {...registrationRegister("confirmPassword")}
              />
              {registrationErrors.confirmPassword && (
                <p className={styles["error"]}>
                  {registrationErrors.confirmPassword.message}
                </p>
              )}
            </div>
            {error !== "" && <p className={styles["error"]}>{error}</p>}
            <button className={styles["button"]}>Create account</button>
          </div>
        </form>
      )}
      {mode === "login" && (
        <form onSubmit={loginHandleSubmit(onLogin)}>
          <div className={styles["wrapper"]}>
            <div className={styles["field"]}>
              <label htmlFor="login">Username or Email</label>
              <input type="text" id="login" {...loginRegister("login")} />
              {loginErrors.login && (
                <p className={styles["error"]}>{loginErrors.login.message}</p>
              )}
            </div>
            <div className={styles["field"]}>
              <label htmlFor="password-login">Password</label>
              <input
                type="password"
                id="password-login"
                {...loginRegister("password")}
              />
              {loginErrors.password && (
                <p className={styles["error"]}>
                  {loginErrors.password.message}
                </p>
              )}
            </div>
            {error !== "" && <p className={styles["error"]}>{error}</p>}
            <button className={styles["button"]}>Log in</button>
          </div>
        </form>
      )}
    </div>
  );
};
