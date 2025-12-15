import z from 'zod';

export const createLeadSchema = z.object({
  body: z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.email(),
    phoneNumber: z.string(),
    businessName: z.string(),
    businessCategory: z.string(),
    source: z.string(),
    city: z.string(),
    state: z.string(),
    address: z.string(),
  }),
});

export type CreateLeadDto = z.infer<typeof createLeadSchema>;

export const updateLeadSchema = z.object({
  body: z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.email(),
    phoneNumber: z.string(),
    businessName: z.string(),
    businessCategory: z.string(),
    source: z.string(),
    city: z.string(),
    state: z.string(),
    address: z.string(),
  }),
});

export type UpdateLeadDto = z.infer<typeof updateLeadSchema>;
