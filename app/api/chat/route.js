import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();
    console.log("🛰️ Received message:", message);

    const hfKey = process.env.HUGGINGFACE_API_KEY;
    if (!hfKey) {
      console.error("❌ Missing HUGGINGFACE_API_KEY in env");
      return NextResponse.json({ error: "Server missing API key" }, { status: 500 });
    }

    const res = await fetch("https://api-inference.huggingface.co/models/gpt2", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hfKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: message }),
    });

    const data = await res.json();
    console.log("🧠 HuggingFace response:", data);

    const reply =
      Array.isArray(data) && data[0]?.generated_text
        ? data[0].generated_text
        : "Sorry, something went wrong";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("🔥 Route error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
