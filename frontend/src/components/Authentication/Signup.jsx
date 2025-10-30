import React from "react";
import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";
const Signup = () => {
  const navigate = useNavigate(); // Initialize useNavigate just after compo in.

  let [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    pic: null,
  });

  // let handleInputChange=(event)=>{
  //   setFormData((currformData)=>{
  //       return {...currformData,[event.target.name]:event.target.value};
  //   });
  // }
  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((currFormData) => ({
      ...currFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUploadPic = async (picfile) => {
    // You create a FormData object.
    // Append the file and Cloudinary preset info.
    // Send it to Cloudinary using fetch().
    // Get back the hosted URL (secure_url).
    // Replace formData.pic with that URL.

    if (!picfile) {
      alert("Please select an image!");
      return;
    }
    console.log("Image is getting uploaded to cloudinary....");
    toaster.create({
      title: "Please wait",
      type: "info", // options: "success" | "error" | "warning" | "info"
      duration: 3000,
      description: "Image is getting uploaded",
    });
    const data = new FormData();
    data.append("file", picfile);
    data.append("upload_preset", "chat-app"); // use your preset name
    data.append("cloud_name", "do7rtm7lu"); // from Cloudinary dashboard

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/do7rtm7lu/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uploaded = await res.json();
      console.log(uploaded); // See full Cloudinary response object

      // The uploaded image URL is usually in uploaded.url or uploaded.secure_url
      setFormData((prev) => ({
        ...prev,
        pic: uploaded.secure_url,
        // before upload it’s a File, and after upload it’s a String (the URL)
        // secure_url already is string
      }));

      // alert("Image uploaded successfully!");
      toaster.create({
        title: "Image uploaded successfully",
        type: "success", // options: "success" | "error" | "warning" | "info"
        duration: 3000,
        // description: "Image is getting uploaded",
      });
    } catch (error) {
      console.error("Upload error:", error);
      // alert("Image upload failed!");
      toaster.create({
        title: "Image upload failed!",
        type: "error", // options: "success" | "error" | "warning" | "info"
        duration: 3000,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // ⬅️ Important line
    console.log("submitting the form....");
    if (formData.password !== formData.confirmpassword) {
      alert("");
      toaster.create({
        title: "Password and confirm password field do not match!",
        type: "error", // options: "success" | "error" | "warning" | "info"
        duration: 3000,
      });
      return;
    }

    // syntax-----axios.post(url, data, config) ;
    //     Where:
    // url → API endpoint (where data is sent)
    // data → object containing data you want to send
    // config → extra settings like headers or tokens

    // Axios is used to make HTTP requests (like Fetch API but simpler).
    // axios.post() is used to send a POST request — typically for submitting forms or sending data to a server.

    //data sent to backend is converted to JSON automatically because you set the header "Content-Type": "application/json".
    // So your backend (Express) will receive it as req.body:
    // Content-Type": "application/json  tells the server that the body of your request is JSON data — not FormData or a file.
    // So your Express route will correctly parse it using express.json() middleware.

    try {
      const response = await axios.post(
        "/api/user", // backend route
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          pic: formData.pic, // this is now a Cloudinary URL
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // alert("Signup successful!");
      toaster.create({
        title: "Signup successful!!",
        type: "success", // options: "success" | "error" | "warning" | "info"
        duration: 3000,
      });
      //Save user info to localStorage
      localStorage.setItem("userInfo", JSON.stringify(response.data));

      //After signup/login, you’ll likely receive a response from backend that includes user data (and maybe a JWT token).
      // You can save it in local storage so the user stays logged in even after page refresh.

      //Redirect to chats page

      navigate("/dashboard");
    } catch (error) {
      console.log("Signup failed:", error);
      alert("Signup failed. ");
      toaster.create({
        title: "Signup failed, Please try again!",
        type: "success", // options: "success" | "error" | "warning" | "info"
        duration: 3000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          value={formData.name}
          id="Name"
          name="name"
          onChange={handleInputChange}
          placeholder="Enter your name"
          required
        />

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
          type="text"
          value={formData.password}
          id="Password"
          name="password"
          onChange={handleInputChange}
          placeholder="Enter your password"
          required
        />

        <label htmlFor="Confirmpassword">Confirm password</label>
        <input
          type="password"
          value={formData.confirmpassword}
          id="Confirmpassword"
          name="confirmpassword"
          onChange={handleInputChange}
          placeholder="Again enter your password"
          required
        />

        <label htmlFor="Pic">Upload your profile photo</label>
        <input
          type="file"
          accept="image/*"
          // value={formData.pic} React file inputs should not have a value
          id="Pic"
          name="pic"
          onChange={(e) => {
            handleInputChange(e); // stores file in formData.pic
            handleUploadPic(e.target.files[0]); // uploads file to Cloudinary
          }}
          // User picks image → onChange fires.
          // handleInputChange saves the file in state.
          // handleUploadPic uploads the file to Cloudinary.
          // When upload completes, the state is updated again with the image URL.
        />

        <button className="my-submit" type="submit">
          Sign Up
        </button>
      </VStack>
    </form>
  );
};

export default Signup;
