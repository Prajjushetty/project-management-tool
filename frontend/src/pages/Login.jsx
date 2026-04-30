import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://project-management-tool-3842.onrender.com/api/auth/login", {
        email,
        password
      });

      // save token
      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      // redirect to dashboard
      window.location.href = "/dashboard";

    } catch (error) {
      alert(error.response?.data?.message || "Login error");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;