import { z } from "zod";

export const proyectoSchema = z.object({
  titulo: z
    .string({ required_error: "El titulo es obligatorio" })
    .min(2, { message: "El titulo debe tener al menos 2 caracteres" }),

  descripcion: z
    .string({ invalid_type_error: "La descripción debe ser texto" })
    .optional(),

  imagen_url: z
    .string({ invalid_type_error: "La URL de la imagen debe ser texto" })
    .url({ message: "La URL de la imagen no es válida" })
    .optional(),

  link: z
    .string({ invalid_type_error: "El link debe ser texto" })
    .url({ message: "El link no es válido" })
    .optional(),
});