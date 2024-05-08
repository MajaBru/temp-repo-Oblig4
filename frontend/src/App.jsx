import "./assets/styles/Globals.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/styles/Globals.css";
/*import components  */
import Nav from "./components/header/Header";
import Footer from "./components/footer/footer";

/* pages */
import Login from "./pages/login_page";
import Logout from "./pages/logout";
import Welcome from "./pages/welcome";
import Dashboard from "./pages/dashboard";
import UserManagement from "./pages/user_management";
import CardsManagement from "./pages/cards_management";
import NewCard from "./pages/NewCard";
import EditCardPage from "./pages/EditCardPage";
import EditUserRole from "./pages/EditUserRole";
import UpdateIconsPage from "./pages/UpdateIcons";

//The game pages
import GameIntro from "./pages/GameIntro";
import GameSolo from "./pages/GameSolo";
import GameTeam from "./pages/GameTeam";
import ChooseMissionCard from "./pages/ChooseMissionCard";

function App() {
  return (
    <>
      <div className="App">
        <Nav />

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/gameintro" element={<GameIntro />} />
          <Route path="/gamesolo" element={<GameSolo />} />
          <Route path="/gameteam" element={<GameTeam />} />
          <Route path="/choosemissioncard" element={<ChooseMissionCard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manage/cards" element={<CardsManagement />} />
          <Route path="/manage/cards/edit/:id" element={<EditCardPage />} />
          <Route path="/manage/cards/icons" element={<UpdateIconsPage />} />
          <Route path="/new" element={<NewCard />} />
          <Route path="/manage/users" element={<UserManagement />} />
          <Route path="/manage/users/edit/:id" element={<EditUserRole />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
