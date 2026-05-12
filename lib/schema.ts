import { z } from "zod";

export const UseCaseSchema = z.object({
  name: z.string(),
  description: z.string(),
  businessValue: z.number().int().min(1).max(5),
  businessValueJustification: z.string(),
  implementationEffort: z.number().int().min(1).max(5),
  implementationEffortNote: z.string(),
  dataRequirements: z.string(),
});

export const DiscoveryOutputSchema = z.object({
  useCases: z.array(UseCaseSchema).min(1).max(6),
  topRecommendation: z.object({
    name: z.string(),
    reasoning: z.string(),
  }),
  starterPlan: z.object({
    days1to30: z.string(),
    days31to60: z.string(),
    days61to90: z.string(),
  }),
});

export type UseCase = z.infer<typeof UseCaseSchema>;
export type DiscoveryOutput = z.infer<typeof DiscoveryOutputSchema>;
