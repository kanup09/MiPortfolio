import { Router } from "express";
import bcrypt from "bcrypt";
import pool from "../baseDatos.js"; 
import jwt from "jsonwebtoken"; 
import { verificarToken } from "../middleware/verificarToken.js";

const router = Router();

router.post("/registro", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Por ahora, validación simple (después la mejoramos con Zod)
    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Guardar en la base
    const [resultado] = await pool.query(
      "INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)",
      [nombre, email, passwordHash]
    );

    res.status(201).json({ id: resultado.insertId, nombre, email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async(req, res)=>{
  try{
    const{email, password} = req.body

    if(!email || !password){
      return res.status(400).json({error: "Faltan campos obligatorios"})
    }

    const[filas] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?", [email]
    )

    if( filas.length === 0 ){
      return res.status(401).json({error: "Credenciales inválidas"})
    }
    
    const coincide = await bcrypt.compare(password, filas[0].password_hash)
    
    if(!coincide){
      return res.status(401).json({error: "Credenciales inválidas"})
    }

    const usuario = filas[0];
    
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token, 
      usuario: { id: usuario.id, 
        nombre: usuario.nombre, 
        rol: usuario.rol } })
        
    router.get("/perfil", verificarToken, (req, res)=>{
      res.json({mensaje: "Accediste con exito", usuario: req.usuario})
    });



    
  }catch(error){
    res.status(500).json({ error: error.message });
  }
});


export default router;