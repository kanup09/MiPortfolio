import { Router } from "express";
import pool from "../baseDatos.js"; 
import { verificarToken } from "../middleware/verificarToken.js";
import { proyectoSchema } from "../schemas/proyectoSchema.js";

const router = Router();

router.get("/proyectos", verificarToken, async (req, res) =>{
    try{
        const [proyectos] = await pool.query (
            "SELECT * FROM proyectos WHERE publicado = true"
        );

        return res.json(proyectos);

    }catch (error) {
        console.error("Error al obtener las consultas:", error);
        return res.status(500).json({ error: "Error interno del servidor." });
    }

});

router.post("/proyectos", verificarToken, async(req, res)=>{
    try{
        const resultado = proyectoSchema.safeParse(req.body);

        if (!resultado.success) {
            return res.status(400).json({ error: "Datos Invalidos" });
        }

        const{titulo , descripcion, imagen_url, link} = resultado.data;

        const[proyecto] = await pool.query(
            "INSERT INTO proyectos (titulo, descripcion, imagen_url, link) VALUES (?, ?, ?, ?)",
            [titulo, descripcion, imagen_url, link]
        );

        return res.status(201).json({ id: proyecto.insertId, titulo });
    
    } catch (error) {

        console.error("Error al crear el proyecto:", error);
        return res.status(500).json({ error: "Error interno del servidor." })

    }
})


export default router;