import { useEffect, useState } from "react";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editProjectId, setEditProjectId] = useState("");

  const API = "https://project-management-tool-3842.onrender.com";

  const getTasks = async () => {
    const res = await axios.get(`${API}/api/tasks`);
    setTasks(res.data);
  };

  const getProjects = async () => {
    const res = await axios.get(`${API}/api/projects`);
    setProjects(res.data);
  };

  const addTask = async () => {
    if (!title || !description || !projectId) {
      alert("Please fill all fields");
      return;
    }

    await axios.post(`${API}/api/tasks`, {
      title,
      description,
      status: "To-Do",
      projectId
    });

    alert("Task added");
    setTitle("");
    setDescription("");
    setProjectId("");
    getTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/api/tasks/${id}`);
    alert("Task deleted");
    getTasks();
  };

  const startEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditStatus(task.status);
    setEditProjectId(task.projectId || "");
  };

  const updateTask = async () => {
    await axios.put(`${API}/api/tasks/${editId}`, {
      title: editTitle,
      description: editDescription,
      status: editStatus,
      projectId: editProjectId
    });

    alert("Task updated");
    setEditId(null);
    getTasks();
  };

  const getProjectName = (id) => {
    const project = projects.find((p) => p._id === id);
    return project ? project.name : "No Project";
  };

  useEffect(() => {
    getTasks();
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
        <h1>Tasks</h1>

        <div className="card">
          <h2>Add Task</h2>

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="dropdown">
            <button className="dropbtn">
              {projectId
                ? projects.find((p) => p._id === projectId)?.name
                : "Select Project"}
            </button>

            <div className="dropdown-content">
              {projects.map((project) => (
                <div key={project._id} onClick={() => setProjectId(project._id)}>
                  {project.name}
                </div>
              ))}
            </div>
          </div>

          <br />
          <button onClick={addTask}>Add Task</button>
        </div>

        <h2 style={{ color: "white" }}>Task List</h2>

        {tasks.map((task) => (
          <div className="card task-card" key={task._id}>
            {editId === task._id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
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
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>

                <select
                  value={editProjectId}
                  onChange={(e) => setEditProjectId(e.target.value)}
                >
                  <option value="">Select Project</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.name}
                    </option>
                  ))}
                </select>

                <br />
                <button onClick={updateTask}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p><b>Project:</b> {getProjectName(task.projectId)}</p>
                <span className="badge">{task.status}</span>

                <br /><br />
                <button onClick={() => startEdit(task)}>Edit</button>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Tasks;