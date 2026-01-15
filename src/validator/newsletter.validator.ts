import z from 'zod';

export const newsLetterValidationSchema = z.object({
  // from: z.enum(["precise", "teonengine", "rhoda"]).optional(),
  to: z.array(z.string().email('All emails must be valid emails')),
  cc: z.array(z.string().email('All emails must be valid emails')).optional(),
  bcc: z.array(z.string().email('All emails must be valid emails')).optional(),
  subject: z.string(),
  from: z.string().optional(),
  message: z.string(),
  link: z.string().optional(),
  template: z.string().optional(),
  creatives: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  socketId: z.string().optional(),
  hotPicks: z
    .array(
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        link: z.string().optional(),
      })
    )
    .optional(),
  economicReport: z
    .array(
      z.object({
        description: z.string().optional(),
        issueType: z.string().optional(),
        duration: z.string().optional(),
        geography: z.string().optional(),
        coverage: z.string().optional(),
      })
    )
    .optional(),
  podcastVlogs: z
    .array(
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        link: z.string().optional(),
      })
    )
    .optional(),
});

export type newsLetterValidationDto = z.infer<
  typeof newsLetterValidationSchema
>;
