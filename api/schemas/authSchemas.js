import { z } from "zod";

// Schema para el registro
export const registroSchema = z.object({
    nombre: z
        .string({ message: "El nombre es obligatorio" })
        .trim()
        .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
        .max(50, {message: "El nombre no debe superar los 50 caracteres" } ),

    email: z
        .string({ message: "El email es obligatorio" })
        .trim()
        .email({ message: "El formato del email no es válido" })
        .max(130, {message: "El email supera la cantidad de caracteres" }),
    
    password: z
        .string({ message: "La contraseña es obligatoria" })
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
        .max(72, {message: "La contraseña no debe superar los 72 caracteres" } ),
    });

// Schema para el login
export const loginSchema = z.object({
    email: z
        .string({ message: "El email es obligatorio" })
        .trim()
        .email({ message: "El formato del email no es válido" }),
    
    password: z
        .string({ message: "La contraseña es obligatoria" })
        .min(1, { message: "La contraseña no puede estar vacía" })
        // .min(1) asegura que pasen un string pero que no sea un string vacío ""
});