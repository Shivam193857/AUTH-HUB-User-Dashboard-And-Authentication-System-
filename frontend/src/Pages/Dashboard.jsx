// frontend/src/Pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Image,
  Input,
  VStack,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { toaster } from "@/components/ui/toaster"; 

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", pic: "" });

  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
        setFormData({ name: data.name, email: data.email, pic: data.pic });
      } catch (err) {
        console.log(err);
        toaster.create({
          title: "Error fetching user",
          type: "error",
          duration: 3000,
        });
      }
    };
    fetchUser();
  }, [token]);

  const handleUpdate = async () => {
    try {
      const { data } = await axios.put("/api/user/update", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
      setEditMode(false);
      toaster.create({
        title: "Profile updated",
        type: "success",
        duration: 3000,
      });
    } catch (err) {
      console.log(err);
      toaster.create({
        title: "Update failed",
        type: "error",
        duration: 3000,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete("/api/user/delete", {
          headers: { Authorization: `Bearer ${token}` },
        });
       
        localStorage.removeItem("userInfo");
        window.location.href = "/signup";
         toaster.create({
          title: "Account deleted",
          type: "success",
          duration: 3000,
        });
      } catch (err) {
        console.log(err);
        toaster.create({
          title: "Error deleting account",
          type: "error",
          duration: 5000,
        });
      }
    }
  };

  return (
    <Container maxW="md" >
    <Box height="70vh" maxW="500px" mx="auto" mt={10} p={5} borderWidth="2px" borderRadius="lg" borderColor="darkviolet">
      <VStack gap={4} alignItems="stretch">
        <Heading size="lg" textAlign="center">
          Welcome, {user.name}
        </Heading>
        <HStack justifyContent="center">
          <Image src={user.pic} boxSize="100px" borderRadius="full" />
        </HStack>
        <Text>Email: {user.email}</Text>

        {editMode ? (
          <VStack gap={3} alignItems="stretch">
            <Input
              value={formData.name}
              placeholder="Name"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              value={formData.email}
              placeholder="Email"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              value={formData.pic}
              placeholder="Profile pic URL"
              onChange={(e) => setFormData({ ...formData, pic: e.target.value })}
            />
            <HStack>
              <Button colorScheme="green" onClick={handleUpdate}>
                Save
              </Button>
              <Button onClick={() => setEditMode(false)}>Cancel</Button>
            </HStack>
          </VStack>
        ) : (
          <HStack justifyContent="center" gap={3}>
            <Button colorScheme="blue" onClick={() => setEditMode(true)}>
              Edit Profile
            </Button>
            <Button colorScheme="yellow" onClick={handleLogout}>
              Logout
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete Account
            </Button>
          </HStack>
        )}
      </VStack>
    </Box>
    </Container>
  );
};

export default Dashboard;
