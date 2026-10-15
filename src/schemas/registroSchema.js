import {z} from "zod"


export const registroSchema = z.object({
    nombre: z
        .string()
        .trim()
        .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
        .max(50, {message: "El nombre no debe superar los 50 caracteres" } ),

    email: z
        .string()
        .trim()
        .min(1, { message: 'El email es obligatorio' })
        .email({ message: "El formato del email no es válido" })
        .max(130, {message: "El email supera la cantidad de caracteres" }),
    
    password: z
        .string()
        .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
        .max(72, {message: "La contraseña no debe superar los 72 caracteres" } ),
    
        // confirmar 
    confirmar: z
        .string()
        .min(1,{message: "Confirmá tu contraseña"}),

}).refine((datos) => datos.confirmar === datos.password, 
    {message: 'Las contraseñas no coinciden', path:['confirmar']});