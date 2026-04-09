import { useEffect, useState } from "react";
import { getIssue, updateIssue, getComments, addComment } from "../api/api";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function IssueDetail() {
  const { id } = useParams();
  const [issue, setIssue] = useState({});
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    load();
  }, []);

const load = async () => {
  const issueData = await getIssue(id);
  const commentsData = await getComments(id);

  setIssue(issueData);
  setComments(commentsData);
};

const updateStatus = async (status) => {
  console.log("CLICKED:", status);

  await updateIssue(id, status);

  // 🔥 FORCE REFRESH FROM BACKEND
  const updatedIssue = await getIssue(id);

  console.log("UPDATED ISSUE:", updatedIssue);

  setIssue(updatedIssue);
};

const handleComment = async () => {
  const res = await addComment(id, text);
  const data = await res.json();
  console.log(data);

  setText("");
  load();
};

  return (
    <div className="container">
      <Navbar />
      <h2>{issue.title}</h2>
      <p>{issue.description}</p>
      <p>Status: {issue.status}</p> 

      <div>
  <button onClick={() => updateStatus("open")}>Open</button>
  <button onClick={() => updateStatus("in_progress")}>In Progress</button>
  <button onClick={() => updateStatus("resolved")}>Resolved</button>
</div>

      <h3>Comments</h3>
      {comments.map(c => <div key={c.id} className="card">{c.body}</div>)}

      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleComment}>Add Comment</button>
    </div>
  );
}