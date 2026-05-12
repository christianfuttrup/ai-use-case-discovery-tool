# AI Use Case Discovery Tool

Most companies know they should be doing something with AI. Few know where to start.

This tool replicates the discovery process I run with clients — you describe your business and your workflows, and it surfaces the highest-value AI use cases ranked by business impact and implementation effort, with a 90-day plan to get started.

Built with Next.js, TypeScript, Shadcn/UI, and the Anthropic API. Deployed on Vercel.

[Live demo](https://ai-use-case-discovery-tool.vercel.app) · [Book a consultation](https://www.linkedin.com/in/christianfuttrup)

---

## Getting started

```bash
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

| Layer | Choice |
| :---- | :----- |
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS + Shadcn/UI |
| LLM | Anthropic API (Claude Sonnet) |
| Validation | Zod |
| Deployment | Vercel |

## How it works

1. A short form collects industry, company size, key workflows, AI maturity, and pain points
2. The form data is structured into a consultant-style brief and sent to the Anthropic API
3. Claude returns a JSON array of scored use cases plus a 90-day starter plan
4. Results are rendered as cards, a priority matrix, and a phased plan
