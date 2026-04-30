const Project = require("../models/Project");

// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const project = new Project({
      ...req.body,
      createdBy: req.user
    });

    await project.save();
    res.json({ message: "Project created", project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET PROJECTS (only user data)
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE PROJECT
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user },
      req.body,
      { new: true }
    );

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE PROJECT
exports.deleteProject = async (req, res) => {
  try {
    await Project.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user
    });

    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};