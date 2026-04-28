async function generate() {
  const input = document.getElementById("input").value;
  const outputDiv = document.getElementById("output");

  outputDiv.innerText = "Generating...";

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "anthropic/claude-3-haiku",
      messages: [
        {
          role: "user",
          content: `Summarize this into clean bullet points:\n${input}`
        }
      ]
    })
  });

  const data = await response.json();

  outputDiv.innerText = data.choices[0].message.content;
}