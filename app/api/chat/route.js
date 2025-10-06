import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();

    const res = await fetch("https://api-inference.huggingface.co/models/gpt2", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: message }),
    });

    const data = await res.json();
    const reply =
      Array.isArray(data) && data[0]?.generated_text
        ? data[0].generated_text
        : "Sorry, something went wrong";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
