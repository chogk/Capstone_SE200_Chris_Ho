import { z } from "zod";

export const policyHolderSchema = z.object({
  nric: z.string().min(9, "NRIC must be at least 9 characters"),
  email: z.string().email(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  selectedPolicies: z.array(z.string()).min(1, "Select at least one policy"),
});

export type PolicyHolderFormValues = z.infer<typeof policyHolderSchema>;
