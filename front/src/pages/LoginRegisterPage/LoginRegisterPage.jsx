import React, { useEffect, useState } from "react";
import "./LoginRegisterPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../redux/features/auth/authSlice";

function LoginPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: loginEmail,
      password: loginPassword,
    };

    dispatch(login(userData));

    setLoginEmail("");
    setLoginPassword("");
  };

  return (
    <div className="login-register-container">
      <div className="form-container">
        <h2>Login</h2>
        <form className="LoginForm" onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
          </div>
          <button className="LoginBtn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

function RegisterPage() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    };

    dispatch(register(userData));

    setRegisterEmail("");
    setRegisterName("");
    setRegisterPassword("");
  };

  return (
    <div className="login-register-container">
      <div className="form-container">
        <h2>Register</h2>
        <form className="RegisterForm" onSubmit={handleRegisterSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
            />
          </div>
          <button className="LoginBtn" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export { LoginPage, RegisterPage };