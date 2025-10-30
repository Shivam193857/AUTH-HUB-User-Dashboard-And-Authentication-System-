import React from "react";
import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";
// import "./Signup.css"
// here both tabs are mounted then login also imports css from signup

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  let [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((currFormData) => ({ ...currFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // ⬅️ Important line
    console.log("submitting the form....");
    toaster.create({
      title: "Signing you in! Please wait",
      type: "info", // options: "success" | "error" | "warning" | "info"
      duration: 3000,
      // description: "Your profile has been updated",
    });

    // syntax-----axios.post(url, data, config) ;
    //     Where:
    // url → API endpoint (where data is sent)
    // data → object containing data you want to send
    // config → extra settings like headers or tokens

    try {
      const response = await axios.post(
        "/api/user/login", // backend route
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // alert("login successful!");
      toaster.create({
        title: "login successful!",
        type: "success", // options: "success" | "error" | "warning" | "info"
        duration: 4000,
        // description: "Your profile has been updated",
      });
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      navigate("/dashboard");
    } catch (error) {
      console.log("login failed:", error);
      // alert("Login failed. Please try again!");
      toaster.create({
        title: "Login failed. Please try again!",
        type: "warning", // options: "success" | "error" | "warning" | "info"
        duration: 4000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <label htmlFor="Email">Email</label>
        <input
          type="text"
          value={formData.email}
          id="Email"
          name="email"
          onChange={handleInputChange}
          placeholder="Enter your Email"
          required
        />

        <label htmlFor="Password">Password</label>
        <input
          type="password"
          value={formData.password}
          id="Password"
          name="password"
          onChange={handleInputChange}
          placeholder="Enter your password"
          required
        />

        <button className="my-submit" onSubmit={handleSubmit}>
          Login
        </button>
        <button
          className="guest my-submit"
          type="button"
          onClick={() => {
            setFormData({ email: "guest@example.com", password: "123456" });
          }}
        >
          GET GUEST USER CREDENTIALS
        </button>
      </VStack>
    </form>
  );
};

export default Login;
