import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  // 1. Buscamos el header de autorización que manda el cliente
  const authHeader = req.headers["authorization"];

  // El token suele venir como "Bearer eyJhbGciOi...", así que lo separamos para quedarnos solo con el código
  const token = authHeader && authHeader.split(" ")[1];

  // 2. Si no hay token, rechazamos el acceso de inmediato
  if (!token) {
    return res.status(401).json({ error: "Acceso denegado. No se proporcionó un token." });
  }

  try {
    // 3. Verificamos que el token sea legítimo usando nuestra clave secreta del .env
    const usuarioDecodificado = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Si es válido, guardamos los datos del usuario dentro de la petición (req.usuario) 
    // para que las rutas que sigan sepan quién está haciendo la consulta.
    req.usuario = usuarioDecodificado;

    // 5. ¡Todo OK! Dejamos que la petición continúe hacia su destino final (la ruta que pedía)
    next();
  } catch (error) {
    // Si el token expiró o es falso, devolvemos error
    return res.status(403).json({ error: "Token inválido o expirado." });
  }
};