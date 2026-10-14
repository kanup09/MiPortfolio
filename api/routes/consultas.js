import { Router } from "express";
import pool from "../baseDatos.js"; 
import transporter from "../mailer.js";
import { consultaSchema } from "../schemas/consultaSchema.js";

 

const router = Router();

// Ruta POST /api/consultas (Guardar y enviar email)
router.post("/consultas", async(req, res)=>{
    try{
        const resultado = consultaSchema.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({ error: "Datos Invalidos" });
    }
        const {nombre, email, tipo, mensaje} =  resultado.data;

        // 2. Guardar en la base de datos
        const [consulta] = await pool.query(
            "INSERT INTO consultas (nombre, email, tipo, mensaje) VALUES (?, ?, ?, ?)",
            [nombre, email, tipo, mensaje]
        );

        const consultaId = consulta.insertId;

        // 3. Enviar el correo usando Nodemailer
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Te llega a vos simulando la recepción
            subject: `Nueva consulta de ${nombre} (${tipo})`,
            text: `Has recibido una nueva consulta:\n\nNombre: ${nombre}\nEmail: ${email}\nTipo: ${tipo}\nMensaje:\n${mensaje}`,
        });

        // 4. Responder con éxito (201)
        return res.status(201).json({
            message: "Consulta guardada y correo enviado con éxito.",
            id: consultaId,
        });
    }catch(error){
        console.error("Error al procesar la consulta:", error);
        return res.status(500).json({ error: "Error interno del servidor." });
    }
})

// Ruta GET /api/consultas (Para el panel de operador más adelante)
router.get("/consultas", async (req, res) => {
    
  try {
    const [consultas] = await pool.query(
      "SELECT * FROM consultas ORDER BY creado_en DESC"
    );
    return res.json(consultas);

  } catch (error) {
    console.error("Error al obtener las consultas:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
});

export default router;