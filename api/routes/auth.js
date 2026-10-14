import { Router } from "express";
import pool from "../baseDatos.js"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import { verificarToken } from "../middleware/verificarToken.js";
import { loginSchema, registroSchema } from "../schemas/authSchemas.js";

const router = Router();

router.post("/registro", async (req, res) => {
  try {
    const resultado = registroSchema.safeParse(req.body);

    if (!resultado.success) {
      return res.status(400).json({ error: "Datos invalidos" });
    }

    const { nombre, email, password } = resultado.data;


    // Encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Guardar en la base
    const [registro] = await pool.query(
      "INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)",
      [nombre, email, passwordHash]
    );

    res.status(201).json({ id: registro.insertId, nombre, email });

  }catch (error) {

  if (error.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ error: "El email ya está registrado" });
  }
  console.error(error);
  res.status(500).json({ error: "Error del servidor" });
}

});

router.post("/login", async(req, res)=>{
  try{
    const resultado = loginSchema.safeParse(req.body);

    if (!resultado.success) {
      return res.status(400).json({ error: "Datos invalidos" });
    }
    const { email, password } = resultado.data;
    
    // Buscar si el email existe
    const [filas] = await pool.query(
      "SELECT * FROM usuarios WHERE email = ?", [email]
    )

    if( filas.length === 0 ){
      return res.status(401).json({error: "Credenciales invalidas"})
    }

    const usuario = filas[0];

    // Comparar la contraseña con bcrypt
    const coincide = await bcrypt.compare(password, usuario.password_hash);
    
    if(!coincide){
      return res.status(401).json({error: "Credenciales invalidas"});
    }
    
    // si la contraseña coincide, generamos el token
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ 
      token, 
      usuario: { 
        id: usuario.id, 
        nombre: usuario.nombre, 
        rol: usuario.rol 
      } 
    })
        
  }catch (error) {
  console.error(error);
  res.status(500).json({ error: "Error del servidor" });
}
});
    
router.get("/perfil", verificarToken, (req, res)=>{
  res.json({mensaje: "Accediste con exito", usuario: req.usuario})
});

export default router;