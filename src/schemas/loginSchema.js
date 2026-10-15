import {z} from "zod"

//  .trim() para limpiar espacios y sintaxis moderna
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "El email es obligatorio" })
    .email({ message: "El formato del email no es válido" }),
  password: z
    .string()
    .min(1, { message: "La contraseña no puede estar vacía" })
});