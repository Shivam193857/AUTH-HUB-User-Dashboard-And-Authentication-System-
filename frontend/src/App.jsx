import './App.css'
// import { Button, HStack } from "@chakra-ui/react"
import { Routes,Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Dashboard from "./Pages/Dashboard";
import { Toaster } from '@/components/ui/toaster';


function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Homepage />} />
      <Route path="/signup" element={<Homepage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </div>
  );
}

export default App;
