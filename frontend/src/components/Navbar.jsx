import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="nav">
      <button onClick={() => navigate("/projects")}>Projects</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}