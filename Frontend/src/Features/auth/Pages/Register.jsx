import React from "react";
import Formgroup from "../Components/Formgroup";
import { Link,useNavigate } from "react-router";
import "../style/register.scss";
import { useState } from "react";
import { useAuth } from "../Hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { loading, handleRegister } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    await handleRegister({ username, password, email });

    navigate("/");
  }

  return (
    <main className="register-page">
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <Formgroup
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
            placeholder="Enter username"
          />
          <Formgroup
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="Enter email"
          />
          <Formgroup
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Enter password"
          />
          <button className="button" type="submit">
            Login
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
