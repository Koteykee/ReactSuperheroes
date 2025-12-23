import { z } from "zod";

export const superheroSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(30, { message: "Name must be at most 30 characters" }),
  image: z.string().trim().url({ message: "Invalid URL" }).optional(),
  intelligence: z
    .number({ message: "Intelligence is required" })
    .min(1, { message: "Minimum is 1" })
    .max(100, { message: "Maximum is 100" }),
  strength: z
    .number({ message: "Strength is required" })
    .min(1, { message: "Minimum is 1" })
    .max(100, { message: "Maximum is 100" }),
  speed: z
    .number({ message: "Speed is required" })
    .min(1, { message: "Minimum is 1" })
    .max(100, { message: "Maximum is 100" }),
  durability: z
    .number({ message: "Durability is required" })
    .min(1, { message: "Minimum is 1" })
    .max(100, { message: "Maximum is 100" }),
  power: z
    .number({ message: "Power is required" })
    .min(1, { message: "Minimum is 1" })
    .max(100, { message: "Maximum is 100" }),
  combat: z
    .number({ message: "Combat is required" })
    .min(1, { message: "Minimum is 1" })
    .max(100, { message: "Maximum is 100" }),
  gender: z.string().trim().min(1, { message: "Gender is required" }),
  race: z.string().trim().min(1, { message: "Race is required" }),
  height: z
    .number({ message: "Height is required" })
    .min(1, { message: "Minimum is 1" })
    .max(10000, { message: "Maximum is 10000" }),
  weight: z
    .number({ message: "Weight is required" })
    .min(1, { message: "Minimum is 1" })
    .max(10000, { message: "Maximum is 10000" }),
  eyeColor: z.string().trim().min(1, { message: "Eye color is required" }),
  hairColor: z.string().trim().min(1, { message: "Hair color is required" }),
  fullName: z.string().trim().min(1, { message: "Full name is required" }),
  placeOfBirth: z
    .string()
    .trim()
    .min(1, { message: "Place of birth is required" }),
  alignment: z.string().trim().min(1, { message: "Alignment is required" }),
  occupation: z.string().trim().min(1, { message: "Occupation is required" }),
});

export type SuperheroFormData = z.infer<typeof superheroSchema>;
