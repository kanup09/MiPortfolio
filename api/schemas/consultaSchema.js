import { z } from "zod";

export const consultaSchema = z.object({
    nombre: z
        .string({ required_error: "El nombre es obligatorio" })
        .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
        
    email: z
        .string({ required_error: "El email es obligatorio" })
        .email({ message: "El formato del email no es válido" }),

    //El método z.enum() recibe un arreglo con los strings exactos permitidos.
    tipo: z.enum(["general", "cotizacion", "asesoria"], {
        required_error: "El tipo de consulta es obligatorio",
        invalid_type_error: "El tipo debe ser 'general', 'cotizacion' o 'asesoria'",
    }),

    mensaje: z
        .string({ required_error: "El mensaje es obligatorio" })
        .min(10, { message: "El mensaje debe tener al menos 10 caracteres" }),
});
