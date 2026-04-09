import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Projects from "./pages/Projects";
import Issues from "./pages/Issues";
import IssueDetail from "./pages/IssueDetail";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/projects" element={
          <ProtectedRoute><Projects /></ProtectedRoute>
        } />

        <Route path="/projects/:id" element={
          <ProtectedRoute><Issues /></ProtectedRoute>
        } />

        <Route path="/issues/:id" element={
          <ProtectedRoute><IssueDetail /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
} 