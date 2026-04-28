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
        model: "openai/gpt-3.5-turbo", // ✅ more reliable
        messages: [
          {
            role: "user",
            content: `Summarize this into bullet points:\n${text}`
          }
        ]
      })
    });

    const data = await response.json();

    console.log("FULL API RESPONSE:", data);

    // 🔴 Handle errors properly
    if (!response.ok) {
      return res.status(500).json({
        output: "API Error: " + JSON.stringify(data)
      });
    }

    const output = data.choices?.[0]?.message?.content;

    res.status(200).json({
      output: output || "No output received"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      output: "Server error"
    });
  }
}
