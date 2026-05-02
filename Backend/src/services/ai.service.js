import { OpenAI } from "openai";

/** Mistral exposes an OpenAI-compatible Chat Completions API. */
const MISTRAL_BASE_URL = "https://api.mistral.ai/v1";
const MISTRAL_MODEL = process.env.MISTRAL_MODEL || "mistral-small-latest";

const extractSection = (text, heading) => {
  const regex = new RegExp(`## ${heading}\\s*([\\s\\S]*?)(?=\\n## |$)`, "i");
  const match = text.match(regex);
  return match ? match[1].trim() : "";
};

export const generatePostmortemFromTimeline = async (prompt) => {
  if (!process.env.MISTRAL_API_KEY) {
    throw new Error("MISTRAL_API_KEY is missing");
  }

  const client = new OpenAI({
    apiKey: process.env.MISTRAL_API_KEY,
    baseURL: MISTRAL_BASE_URL,
  });

  const completion = await client.chat.completions.create({
    model: MISTRAL_MODEL,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 800,
  });

  const content = completion.choices?.[0]?.message?.content || "";

  const summary = extractSection(content, "Summary");
  const rootCause = extractSection(content, "Root Cause");
  const actionItems = extractSection(content, "Action Items");

  return {
    summary,
    rootCause,
    actionItems,
    raw: content,
  };
};

export default {
  generatePostmortemFromTimeline,
};
