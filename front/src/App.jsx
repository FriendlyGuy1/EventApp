import React from "react";
import EventForm from "./pages/EventForm/EventForm.jsx";
import EventList from "./pages/EventList/EventList.jsx";
import Navbar from "./components/NavBar/NavBar.jsx";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
} from "./pages/LoginRegisterPage/LoginRegisterPage.jsx";
import AdminPanel from "./pages/AdminPage/AdminPage.jsx";
import FavoriteEventsPage from "./pages/FavoriteEventPage/FavoriteEventPage.jsx";
import EventApproval from "./components/EventApproval/EventApproval.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <div className="container">
          <Routes>
            <Route path="/post" element={<EventForm />} />
            <Route path="/" element={<EventList />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminPanel/>} />
            <Route path="/favorite-events" element={<FavoriteEventsPage/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;