import axios from "axios";
import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
function Login() {
  const [form, setForm] = useState({ mobile: "", password: "" });
  const { loginUser } = useUser();
  const navigate = useNavigate();
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:8080/api/auth/login",
      form
    );

    // Correct: pass both user and token
    loginUser(res.data.user, res.data.token);

    alert("Login Successful!");
    navigate("/liked");
  } catch (err) {
    alert("Invalid login!");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-xl w-96">
        <h1 className="text-3xl text-white mb-5 text-center">Login</h1>

        <input
          name="mobile"
          placeholder="Mobile"
          value={form.mobile}
          className="w-full p-3 mb-3 bg-gray-700 text-white rounded"
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          className="w-full p-3 mb-3 bg-gray-700 text-white rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-blue-600 p-3 rounded text-white mt-3">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

