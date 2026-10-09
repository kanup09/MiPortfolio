import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import pool from "./baseDatos.js";
import authRoutes from "./routes/auth.js";
import consultasRoutes from "./routes/consultas.js";


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", consultasRoutes);

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", db: "conectada" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
