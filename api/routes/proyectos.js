import { Router } from "express";
import pool from "../baseDatos.js"; 
import { verificarToken } from "../middleware/verificarToken.js";


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
        const{titulo , descripcion, imagen_url, link} = req.body;

        if(!titulo){
            return res.status(400).json({ error: "El título es obligatorio." });
        }

        const[resultado] = await pool.query(
            "INSERT INTO proyectos (titulo, descripcion, imagen_url, link) VALUES (?, ?, ?, ?)",
            [titulo, descripcion, imagen_url, link]
        );

        return res.status(201).json({ id: resultado.insertId, titulo });
    
    } catch (error) {

        console.error("Error al crear el proyecto:", error);
        return res.status(500).json({ error: "Error interno del servidor." })

    }
})


export default router;