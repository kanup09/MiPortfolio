import {z} from "zod"


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
    
        // confirmar 
    confirmar: z
        .string({ message: "No puede estar vacio" })
        .min(1,{message: "Confirmá tu contraseña"}),

}).refine((datos) => datos.confirmar === datos.password, 
    {message: 'No son iguales las contraseñas', path:['confirmar']});