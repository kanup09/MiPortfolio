import { z } from "zod";

// Schema para el registro
export const registroSchema = z.object({
    nombre: z
        .string({ required_error: "El nombre es obligatorio" })
        .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    
    email: z
        .string({ required_error: "El email es obligatorio" })
        .email({ message: "El formato del email no es válido" }),
    
    password: z
        .string({ required_error: "La contraseña es obligatoria" })
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    });

// Schema para el login
export const loginSchema = z.object({
    email: z
        .string({ required_error: "El email es obligatorio" })
        .email({ message: "El formato del email no es válido" }),
    
    password: z
        .string({ required_error: "La contraseña es obligatoria" })
        .min(1, { message: "La contraseña no puede estar vacía" }), 
        // .min(1) asegura que pasen un string pero que no sea un string vacío ""
});