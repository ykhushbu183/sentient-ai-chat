import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { messages } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
  });

  return new Response(
    JSON.stringify({ reply: completion.choices[0].message.content }),
    { status: 200 }
  );
}
