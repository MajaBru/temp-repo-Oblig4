import "./assets/styles/Globals.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/styles/Globals.css";
/*import components  */
import Nav from "./components/header/Header";
import Footer from "./components/footer/footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

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
import MakeAssessmentSchema from "./pages/MakeAssessmentSchema";
import TeacherExplore from "./pages/TeacherExplore";

function App() {
  const user = {
    name: 'jonathan',
    role: 'Admin',
  };
  return (
    <>
      <div className="App">
        <Nav />

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/gameintro" element={<GameIntro />} />
          <Route path="/gamesolo" element={<GameSolo />} />
          <Route path="/gameteam" element={<GameTeam />} />
          <Route path="/teacherexplore" element={<TeacherExplore />} />
          <Route
            path="/makeassessmentschema"
            element={<MakeAssessmentSchema />}
          />
          <Route path="/choosemissioncard" element={<ChooseMissionCard />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          {/* Game pages*/}
          <Route path="/gameintro" element={
            <ProtectedRoute isAllowed={!!user}>
              <GameIntro />
            </ProtectedRoute>
          } />

          <Route path="/gamesolo" element={
            <ProtectedRoute isAllowed={!!user}>
              <GameSolo />
            </ProtectedRoute>
          } />

          <Route path="/gameteam" element={
            <ProtectedRoute isAllowed={!!user}>
              <GameTeam />
            </ProtectedRoute>
          } />

          {/* Admin pages */}
          <Route path="/manage/cards" element={
            <ProtectedRoute isAllowed={
              !!user && user.role.includes('Admin')
            }>
              <CardsManagement />
            </ProtectedRoute>
          } />

          <Route path="/manage/cards/edit/:id" element={
            <ProtectedRoute isAllowed={
              !!user && user.role.includes('Admin')
            }>
              <EditCardPage />
            </ProtectedRoute>
          } />

          <Route path="/manage/cards/icons" element={
            <ProtectedRoute isAllowed={
              !!user && user.role.includes('Admin')
            }>
              <UpdateIconsPage />
            </ProtectedRoute>} />

          <Route path="/new" element={
            <ProtectedRoute isAllowed={
              !!user && user.role.includes('Admin')
            }>
              <NewCard />
            </ProtectedRoute>} />

          <Route path="/manage/users" element={
            <ProtectedRoute isAllowed={
              !!user && user.role.includes('Admin')
            }>
              <UserManagement />
            </ProtectedRoute>} />

          <Route path="/manage/users/edit/:id" element={
            <ProtectedRoute isAllowed={
              !!user && user.role.includes('Admin')
            }>
              <EditUserRole />
            </ProtectedRoute>} />

        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
