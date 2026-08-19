const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('.'));

// ===============================
// MongoDB Connection
// ===============================

mongoose.connect(
  process.env.MONGODB_URI ||
  'mongodb://127.0.0.1:27017/portfolio'
)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('DB Connection Error:', err));


// ===============================
// Portfolio Schema
// ===============================

const portfolioSchema = new mongoose.Schema({
  name: String,
  dateOfBirth: String,
  location: String,
  email: String,
  phone: String,

  course: String,
  college: String,
  department: String,
  year: String,

  skills: [String],
  programmingLanguages: [String],

  experience: String,
  certifications: String,
  certificateCount: Number,

  hobbies: [String],
  strengths: [String],

  careerGoal: String,
  interestedCareer: String,
  professionalObjective: String
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);


// ===============================
// Project Schema
// ===============================

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  techStack: [String],
  link: String
});

const Project = mongoose.model('Project', projectSchema);


// ===============================
// Vishwa R Portfolio Details
// ===============================

const vishwaPortfolio = {
  name: "Vishwa R",
  dateOfBirth: "03/06/2008",
  location: "Perambalur",
  email: "avishwa784@gmail.com",
  phone: "8438227167",

  course: "B.E. Computer Science and Engineering",
  college: "Dhanalakshmi Srinivasan Engineering College",
  department: "CSE",
  year: "II Year",

  skills: [
    "Problem Solving"
  ],

  programmingLanguages: [
    "Python",
    "Java"
  ],

  experience: "No professional work experience",

  certifications: "Python, C, Symposium",
  certificateCount: 8,

  hobbies: [
    "Gaming",
    "Reading"
  ],

  strengths: [
    "Problem Solving",
    "Positive Attitude",
    "Self Confidence"
  ],

  careerGoal: "To build a strong career in the IT field",

  interestedCareer: "Web Development",

  professionalObjective:
    "Keep learning, improve my skills, and keep moving forward in my career."
};


// ===============================
// Portfolio API
// ===============================

// Get portfolio details
app.get('/api/profile', (req, res) => {
  res.json(vishwaPortfolio);
});


// ===============================
// Project API Routes
// ===============================

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});


// Add a new project
app.post('/api/projects', async (req, res) => {
  try {
    const newProject = new Project(req.body);

    await newProject.save();

    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
});


// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Vishwa R Portfolio Server running on port ${PORT}`);
  console.log(`Open: http://localhost:${PORT}`);
});
