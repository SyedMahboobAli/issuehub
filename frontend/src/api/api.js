const API = "http://127.0.0.1:8000/api";

const getToken = () => localStorage.getItem("token");

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`
});

// AUTH
export const signup = (data) =>
  fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

export const login = async (email, password) => {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    body: formData
  });

  return res.json();
};

// PROJECTS
export const getProjects = () =>
  fetch(`${API}/projects`, { headers: headers() }).then(res => res.json());

export const createProject = (data) => {
  const params = new URLSearchParams({
    name: data.name,
    key: data.key,
    description: data.description
  });

  return fetch(`${API}/projects?${params.toString()}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
};

// ISSUES
export const getIssues = (projectId) =>
  fetch(`${API}/projects/${projectId}/issues`, {
    headers: headers()
  }).then(res => res.json());

export const createIssue = (projectId, data) => {
  const params = new URLSearchParams({
    title: data.title,
    description: data.description,
    priority: data.priority,
    assignee_id: data.assignee_id ?? ""
  });

  return fetch(`${API}/projects/${projectId}/issues?${params.toString()}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
};

export const getIssue = (id) =>
  fetch(`${API}/issues/${id}`, { headers: headers() }).then(res => res.json());

export const updateIssue = (id, status) => {
  const params = new URLSearchParams({ status });

  return fetch(`${API}/issues/${id}?${params.toString()}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
};

// COMMENTS
export const getComments = (id) =>
  fetch(`${API}/issues/${id}/comments`, {
    headers: headers()
  }).then(res => res.json());

export const addComment = (id, body) => {
  const params = new URLSearchParams({
    body: body
  });

  return fetch(`${API}/issues/${id}/comments?${params.toString()}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
};