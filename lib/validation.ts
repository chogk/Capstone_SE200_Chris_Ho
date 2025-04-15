import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  // ... other user validation rules
});

export const policySchema = z.object({
  policyNumber: z.string().min(5),
  amount: z.number().positive(),
  // ... other policy validation rules
});

// You can also export utility functions here
export function validateEmail(email: string): boolean {
  // ... your email validation logic
  return z.string().email().safeParse(email).success;
}