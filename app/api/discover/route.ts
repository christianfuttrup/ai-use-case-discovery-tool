import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { buildUserMessage, SYSTEM_PROMPT } from "@/lib/prompt";
import { DiscoveryOutputSchema } from "@/lib/schema";

const anthropic = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: buildUserMessage(body) }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    const json = text
      .replace(/^```(?:json)?\n?/, "")
      .replace(/\n?```$/, "")
      .trim();

    const parsed = DiscoveryOutputSchema.parse(JSON.parse(json));
    return NextResponse.json(parsed);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to generate use cases" },
      { status: 500 }
    );
  }
}
