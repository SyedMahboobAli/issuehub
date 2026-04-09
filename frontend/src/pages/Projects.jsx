import { useEffect, useState } from "react";
import { getProjects, createProject } from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getProjects();
    setProjects(data);
  };

const handleCreate = async () => {
  const payload = {
    name: form.name || "",
    key: form.key || "PRJ",
    description: form.description || ""
  };

  console.log("PROJECT PAYLOAD:", payload);

  const res = await createProject(payload);
  const data = await res.json();
  console.log(data);

  load();
};

  return (
    <div className="container">
      <Navbar />
      <h2>Projects</h2>

     <input
  placeholder="Name"
  onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
/>

<input
  placeholder="Key"
  onChange={(e) => setForm(prev => ({ ...prev, key: e.target.value }))}
/>

<input
  placeholder="Description"
  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
/>
      <button onClick={handleCreate}>Create</button>

      {projects.map(p => (
        <div key={p.id} className="card" onClick={() => navigate(`/projects/${p.id}`)}>
          {p.name}
        </div>
      ))}
    </div>
  );
}