import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
    address: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User Data:", form);

    try{
        const res = await axios.post(
  "http://localhost:8080/api/signup",
  form,
  { headers: { "Content-Type": "application/json" } }
);

        alert("Signup Successful!");
        navigate("/login");
    }catch(err){
        alert("Signup Failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Signup
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-white font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full mt-1 p-3 rounded-lg bg-gray-700 text-white outline-none"
              required
            />
          </div>

                    {/* Password */}
          <div>
            <label className="text-white font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full mt-1 p-3 rounded-lg bg-gray-700 text-white outline-none"
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="text-white font-semibold">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              className="w-full mt-1 p-3 rounded-lg bg-gray-700 text-white outline-none"
              required
            />
          </div>



          {/* Address */}
          <div>
            <label className="text-white font-semibold">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full mt-1 p-3 rounded-lg bg-gray-700 text-white outline-none h-24"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-semibold transition"
          >
            Sign Up
          </button>

        </form>
      </div>
    </div>
  );
}

export default Signup;
