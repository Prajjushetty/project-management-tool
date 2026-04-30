import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "https://project-management-tool-3842.onrender.com/api/auth/register",
        {
          name,
          email,
          password
        }
      );

      alert(res.data.message);

// remove old logged-in user token
localStorage.removeItem("token");

// go to login page
window.location.href = "/";

    } catch (error) {
      alert(error.response?.data?.message || "Error in registration");
    }
  };

  return (
    <div className="page">
      <div className="card form-card">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
        <button onClick={handleRegister}>Register</button>

        <p>
          Already have an account?{" "}
          <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;