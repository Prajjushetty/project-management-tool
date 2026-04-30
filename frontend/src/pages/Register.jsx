import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("https://project-management-tool-3842.onrender.com/api/auth/register", {
        name,
        email,
        password
      });

      alert(res.data.message);
   } catch (error) {
  alert(error.response?.data?.message || "Error in registration");
}
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      /><br /><br />

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

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;