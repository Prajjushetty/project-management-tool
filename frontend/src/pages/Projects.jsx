import { useEffect, useState } from "react";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("");

 const getProjects = async () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const res = await axios.get(
    "https://project-management-tool-3842.onrender.com/api/projects",
    config
  );

  setProjects(res.data);
};

  const addProject = async () => {
    if (!name || !description) {
      alert("Please fill all fields");
      return;
    }

   const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

await axios.post(
  "https://project-management-tool-3842.onrender.com/api/projects",
  {
    name,
    description,
    status: "Active"
  },
  config
);

    alert("Project added");
    setName("");
    setDescription("");
    getProjects();
  };

const deleteProject = async (id) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  await axios.delete(
    `https://project-management-tool-3842.onrender.com/api/projects/${id}`,
    config
  );

  alert("Project deleted");
  getProjects();
};

  const startEdit = (project) => {
    setEditId(project._id);
    setEditName(project.name);
    setEditDescription(project.description);
    setEditStatus(project.status);
  };

  const updateProject = async () => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    await axios.put(
      `https://project-management-tool-3842.onrender.com/api/projects/${editId}`,
      {
        name: editName,
        description: editDescription,
        status: editStatus
      },
      config
    );

    alert("Project updated");
    setEditId(null);
    getProjects();
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <div className="navbar">
        <h2>Project Management Tool</h2>
        <div>
          <a href="/dashboard">Dashboard</a>
          <a href="/projects">Projects</a>
          <a href="/tasks">Tasks</a>
        </div>
      </div>

      <div className="page">
        <h1>Projects</h1>

        <div className="card">
          <h2>Add Project</h2>

          <input
            type="text"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <br />
          <button onClick={addProject}>Add Project</button>
        </div>

        <h2 style={{ color: "white" }}>Project List</h2>

        {projects.map((project) => (
          <div className="card project-card" key={project._id}>
            {editId === project._id ? (
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />

                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />

                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                </select>

                <br />
                <button onClick={updateProject}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <span className="badge">{project.status}</span>

                <br /><br />
                <button onClick={() => startEdit(project)}>Edit</button>
                <button onClick={() => deleteProject(project._id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Projects;