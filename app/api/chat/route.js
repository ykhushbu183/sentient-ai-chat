export async function POST(req) {
  const { message } = await req.json();

  const res = await fetch(
    "https://api-inference.huggingface.co/models/gpt2", 
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.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}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: message }),
    }
  );

  const data = await res.json();
  const reply = data?.generated_text || "Sorry, something went wrong";

  return new Response(JSON.stringify({ reply }), { status: 200 });
}
