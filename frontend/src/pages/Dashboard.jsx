import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const API = "https://project-management-tool-3842.onrender.com";

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const getData = async () => {
    const projectRes = await axios.get(`${API}/api/projects`);
    const taskRes = await axios.get(`${API}/api/tasks`);

    setProjects(projectRes.data);
    setTasks(taskRes.data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      window.location.href = "/";
    } else {
      getData();
    }
  }, []);

  const completedTasks = tasks.filter((task) => task.status === "Done").length;
  const pendingTasks = tasks.filter((task) => task.status !== "Done").length;

  return (
    <>
      <div className="navbar">
        <h2>Project Management Tool</h2>

        <div>
          <a href="/dashboard">Dashboard</a>
          <a href="/projects">Projects</a>
          <a href="/tasks">Tasks</a>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="page">
        <h1>Welcome to Dashboard</h1>

        <div className="grid">
          <div className="card">
            <h3>Total Projects</h3>
            <h1>{projects.length}</h1>
            <p>All created projects</p>
          </div>

          <div className="card">
            <h3>Total Tasks</h3>
            <h1>{tasks.length}</h1>
            <p>All assigned tasks</p>
          </div>

          <div className="card">
            <h3>Completed Tasks</h3>
            <h1>{completedTasks}</h1>
            <p>Finished tasks</p>
          </div>

          <div className="card">
            <h3>Pending Tasks</h3>
            <h1>{pendingTasks}</h1>
            <p>Tasks not completed</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;