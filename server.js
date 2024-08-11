
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "voting_app",
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL");
});

// Routes

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM login_details WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Internal server error" });
    } else if (result.length > 0) {
      res.json({ user: result[0] });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

app.post("/api/signup", (req, res) => {
  const { username, password, email } = req.body;
  const sql =
    "INSERT INTO login_details (username, password, email) VALUES (?, ?, ?)";
  db.query(sql, [username, password, email], (err, result) => {
    if (err) {
      console.error("Signup error:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ user: { user_id: result.insertId, username, email } });
    }
  });
});

app.get("/api/candidates", (req, res) => {
  const sql = "SELECT * FROM vote_candidates";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching candidates:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ candidates: result });
    }
  });
});

app.post("/api/vote", (req, res) => {
  const { userId, candidateId } = req.body;
  const voteSql = "INSERT INTO user_responses (user_id, candidate_id) VALUES (?, ?)";
  const updateVoteStatusSql = "UPDATE login_details SET hasVoted = TRUE WHERE user_id = ?";
  
  db.query(voteSql, [userId, candidateId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    db.query(updateVoteStatusSql, [userId], (updateErr, updateResult) => {
      if (updateErr) {
        return res.status(500).json({ error: "Internal server error" });
      }
      res.sendStatus(200);
    });
  });
});


// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
