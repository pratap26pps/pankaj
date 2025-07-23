import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  images: z.array(z.string().url()).optional(),
  duration: z.string().optional(),
  warranty: z.string().optional(),
  recommended: z.string().optional(),
  problems: z.array(z.string()).optional(), 
  category: z.string().optional(),
});
