import express from "express";
import pool from "../db.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create case (LEA)
router.post("/", auth, async (req, res) => {
  const { caseNumber, title } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO cases (case_number, title, status, created_by) VALUES ($1, $2, $3, $4) RETURNING *",
      [caseNumber, title, "OPEN", req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all cases
router.get("/", auth, async (req, res) => {
  const result = await pool.query("SELECT * FROM cases");
  res.json(result.rows);
});

export default router;
