import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  try {
    const output = await hf.textGeneration({
      model: "tiiuae/falcon-7b-instruct",
      inputs: message,
      parameters: { max_new_tokens: 150 }
    });

    res.status(200).json({ reply: output.generated_text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate response" });
  }
}
