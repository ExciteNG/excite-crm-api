import z from 'zod';

export const signupSchema = z.object({
  body: z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.email(),
    password: z.string().min(8, 'password must have a minimum of 8 characters'),
  }),
});

export type signupDto = z.infer<typeof signupSchema>;

export const verifyUserSchema = z.object({
  params: z.object({
    confirmationCode: z.string(),
  }),
});

export type verifyUserDto = z.infer<typeof verifyUserSchema>;

export const resendVerificationSchema = z.object({
  body: z.object({
    email: z.email(),
  }),
});

export type resendVerificationDto = z.infer<typeof resendVerificationSchema>;

export const loginSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string(),
  }),
});

export type loginDto = z.infer<typeof loginSchema>;

export const resetPasswordSchema = z.object({
  body: z.object({
    email: z.email(),
  }),
});

export type resetPasswordDto = z.infer<typeof resetPasswordSchema>;

export const updatePasswordSchema = z.object({
  body: z.object({
    newPassword: z.string(),
    oldPassword: z.string(),
    confirmNewPassword: z.string(),
  }),
});

export type updatePasswordDto = z.infer<typeof updatePasswordSchema>;
