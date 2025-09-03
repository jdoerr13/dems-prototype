import express from "express";
import pool from "../db.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Upload evidence (metadata only for now)
router.post("/:caseId", auth, async (req, res) => {
  const { caseId } = req.params;
  const { filename, metadata } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO evidence (case_id, filename, metadata, uploaded_by) VALUES ($1, $2, $3, $4) RETURNING *",
      [caseId, filename, metadata, req.user.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get evidence for a case
router.get("/:caseId", auth, async (req, res) => {
  const { caseId } = req.params;
  const result = await pool.query("SELECT * FROM evidence WHERE case_id = $1", [caseId]);
  res.json(result.rows);
});

export default router;
