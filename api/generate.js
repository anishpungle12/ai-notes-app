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
        model: "anthropic/claude-3-haiku",
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

if (!response.ok) {
  return res.status(500).json({
    error: data
  });
}

res.status(200).json({
  output: data.choices?.[0]?.message?.content || "No response from AI"
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}
