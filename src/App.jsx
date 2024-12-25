import React from "react"
import { useEffect } from "react";
import Home from "./pages/Home/Home"
import {Routes,Route, useNavigate} from 'react-router-dom'
import Login from "./pages/login/Login";
import Player from "./pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firbase";
import { ToastContainer, toast } from "react-toastify";


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged In")
        navigate('/');
      }
      else {
        console.log("Logged out");
        navigate('/login');
      }
    });
 },[])

  return (
    <>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/player/:id' element={<Player></Player>}/>
      </Routes>
    </>
  );
}

export default App
