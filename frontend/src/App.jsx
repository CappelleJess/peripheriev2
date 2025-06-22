import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Play from "./pages/Play";
import Codex from "./pages/Codex";
import AdminDashboard from './pages/AdminDashboard';
import Reliques from "./pages/section/Reliques";
import Fragments from "./pages/section/Fragments";
import Bios from "./pages/section/Bios";
import MentionsLegales from "./pages/section/MentionsLegales";
import Logs from "./pages/section/Logs";
import TestEmail from "./pages/TestEmail";

import Layout from "./components/Layout";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import IntroTerminal from './components/IntroTerminal';

function App() {
  return (
    <>
      <Routes>
        <Route path="/intro" element={<IntroTerminal />} />
        <Route path="/play" element={<PublicRoute><Play /></PublicRoute>} />

        <Route element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="codex" element={<Codex />} />
          <Route path="/reliques" element={<PrivateRoute requiredRole="user" element={<Reliques />} />} />
          <Route path="/fragments" element={<Fragments />} />
          <Route path="/bios" element={<PrivateRoute requiredRole="user" element={<Bios />} />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/logs" element={<Logs />} />

          <Route path="/testemail" element={<PrivateRoute requiredRole="user" element={<TestEmail />} />} />

          <Route path="dashboard" element={<PrivateRoute requiredRole="user" element={<Dashboard />} />} />
          <Route path="settings" element={<PrivateRoute element={<Settings />} />} />
          <Route path="/admin" element={<PrivateRoute requiredRole="admin" element={<AdminDashboard />} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="retro-toast"
        bodyClassName="retro-toast-body"
        progressClassName="retro-toast-progress"
      />
    </>
  );
}

export default App;