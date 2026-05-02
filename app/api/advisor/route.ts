import { NextResponse } from "next/server";

const SYSTEM =
  "You are KrishiMitra AI Advisor, an expert agricultural assistant for Indian farmers. You give practical, specific advice about crops, soil health, pest management, weather impacts, and market prices. Keep answers concise and actionable. Mention specific Indian crops, seasons (Kharif/Rabi), and local context where relevant.";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const message =
    typeof body === "object" &&
    body !== null &&
    "message" in body &&
    typeof (body as { message: unknown }).message === "string"
      ? (body as { message: string }).message.trim()
      : "";

  if (!message) {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      reply:
        "AI advisor is not configured on this server. Ask your administrator to set ANTHROPIC_API_KEY.",
    });
  }

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: SYSTEM,
      messages: [{ role: "user", content: message }],
    }),
  });

  if (!res.ok) {
    return NextResponse.json({
      reply:
        "The advisor service is temporarily unavailable. Please try again later.",
    });
  }

  const data: {
    content?: Array<{ type?: string; text?: string }>;
  } = await res.json();
  const reply =
    data.content?.[0]?.text ??
    "I'm sorry, I couldn't process that. Please try again.";

  return NextResponse.json({ reply });
}
