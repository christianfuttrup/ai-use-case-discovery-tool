export interface FormData {
  industry: string;
  companySize: string;
  workflows: string;
  aiMaturity: string;
  painPoints?: string;
}

export const SYSTEM_PROMPT = `You are an AI implementation consultant with 10 years of experience helping mid-market companies adopt AI. You are direct, practical, and focused on business value over technology hype.

Your job is to analyse a company brief and identify the highest-value AI use cases, ranked by business impact and implementation effort. You return structured JSON only — no prose, no markdown, no explanation outside the JSON object.`;

export function buildUserMessage(data: FormData): string {
  return `Company Brief:
- Industry: ${data.industry}
- Company size: ${data.companySize} employees
- Most time-consuming workflows: ${data.workflows}
- AI maturity: ${data.aiMaturity}${data.painPoints ? `\n- Pain points / bottlenecks: ${data.painPoints}` : ""}

Identify 3–5 high-value AI use cases for this company. For each use case provide:
- name: short label (e.g. "Automated Invoice Processing")
- description: one sentence on what the AI does and what it replaces
- businessValue: integer 1–5 (5 = transformative revenue or cost impact)
- businessValueJustification: one sentence explaining the score
- implementationEffort: integer 1–5 (5 = very hard — custom models, major integrations)
- implementationEffortNote: one sentence on why
- dataRequirements: what data or systems the company needs in place

Sort use cases: highest businessValue first, then lowest implementationEffort as tiebreaker.

Also provide:
- topRecommendation: { name, reasoning } — pick the single best use case and explain why in 2–3 sentences
- starterPlan: { days1to30, days31to60, days61to90 } — a 90-day plan for the top use case, one paragraph per phase covering: Diagnose (assess, talk to people, gather data), Pilot (one team, one workflow, defined success metric), Review (measure, decide whether to scale or pivot)

Return a single valid JSON object with this exact shape and no other text:
{
  "useCases": [...],
  "topRecommendation": { "name": "...", "reasoning": "..." },
  "starterPlan": { "days1to30": "...", "days31to60": "...", "days61to90": "..." }
}`;
}
