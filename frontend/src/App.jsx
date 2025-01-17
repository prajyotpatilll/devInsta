import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Navbar from "./componants/Navbar";
import Footer from "./componants/Footer";
import Developers from "./pages/Developers";
import DevelopersProfile from "./pages/DevelopersProfile";
import Projects from "./pages/Projects";
import "./App.css";
import Login from "./pages/Login";
import Myprofile from "./pages/Myprofile";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[100vw]">
      <ToastContainer />

      <header>
        <Navbar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/developers/:_id" element={<DevelopersProfile />} />
          <Route path="/myprofile" element={<Myprofile />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default App;
