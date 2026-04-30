import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://project-management-tool-3842.onrender.com/api/auth/login",
        {
          email,
          password
        }
      );

      // store token
      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      // redirect to dashboard
      window.location.href = "/dashboard";
    } catch (error) {
      alert(error.response?.data?.message || "Login error");
    }
  };

  return (
    <div className="page">
      <div className="card form-card">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <button onClick={handleLogin}>Login</button>

        <p>
          Don't have an account?{" "}
          <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;