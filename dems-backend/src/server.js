import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import caseRoutes from "./routes/cases.js";
import evidenceRoutes from "./routes/evidence.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/cases", caseRoutes);
app.use("/evidence", evidenceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 DEMS backend running on port ${PORT}`));
