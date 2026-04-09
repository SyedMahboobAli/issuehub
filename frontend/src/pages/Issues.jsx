import { useEffect, useState } from "react";
import { getIssues, createIssue } from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Issues() {
  const { id } = useParams();
  const [issues, setIssues] = useState([]);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getIssues(id);
    setIssues(data);
  };

const handleCreate = async () => {
  const payload = {
    title: form.title || "",
    description: form.description || "",
    priority: "medium",
    assignee_id: null
  };

  console.log("ISSUE PAYLOAD:", payload);

  const res = await createIssue(id, payload);
  const data = await res.json();
  console.log(data);

  load();
};

  return (
    <div className="container">
      <Navbar />
      <h2>Issues</h2>

     <input
  placeholder="Title"
  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
/>

<input
  placeholder="Description"
  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
/>
      <button onClick={handleCreate}>Create Issue</button>

      {issues.map(i => (
        <div key={i.id} className="card" onClick={() => navigate(`/issues/${i.id}`)}>
          {i.title} - {i.status}
        </div>
      ))}
    </div>
  );
}