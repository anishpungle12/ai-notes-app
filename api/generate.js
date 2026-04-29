export default async function handler(req, res) {
  try {
    const { text } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Summarize this into bullet points:\n${text}`
          }
        ]
      })
    });

    const data = await response.json();

    console.log("FULL RESPONSE:", data);

    // 🔥 safer extraction
  let requestCount = 0;
const MAX_REQUESTS = 50; // limit per deployment

export default async function handler(req, res) {
  try {
    if (requestCount > MAX_REQUESTS) {
      return res.status(429).json({
        output: "Limit reached. Try later."
      });
    }

    requestCount++;

    const { text, mode } = req.body;

    // 🎯 Different prompts
    let prompt = "";

    if (mode === "summary") {
      prompt = `Summarize this into bullet points:\n${text}`;
    } else if (mode === "explain") {
      prompt = `Explain this in very simple terms:\n${text}`;
    } else if (mode === "questions") {
      prompt = `Create exam-style questions from this:\n${text}`;
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "anthropic/claude-3-haiku",
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();

    const output = data.choices?.[0]?.message?.content;

    res.status(200).json({
      output: output || "No output received"
    });

  } catch (error) {
    res.status(500).json({
      output: "Server error"
    });
  }
}
