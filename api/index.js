import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import pool from "./baseDatos.js";
import authRoutes from "./routes/auth.js";
import consultasRoutes from "./routes/consultas.js";
import proyectos from "./routes/proyectos.js"

const app = express();
app.use(cors());
app.use(express.json());


// Autenticaciones

app.use("/api", authRoutes);
app.use("/api", consultasRoutes);
app.use("/api", proyectos);



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
