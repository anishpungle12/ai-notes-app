async function generate() {
  const input = document.getElementById("input").value;
  const mode = document.getElementById("mode").value;
  const outputDiv = document.getElementById("output");

  // ❗ Empty input check
  if (!input.trim()) {
    outputDiv.innerText = "Please enter some text";
    return;
  }

  // ❗ Input length limit
  if (input.length > 1000) {
    outputDiv.innerText = "Input too long (max 1000 characters)";
    return;
  }

  // ⏳ Loading indicator
  outputDiv.innerText = "Generating...";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: input, mode: mode })
    });

    const data = await response.json();

    // ❗ Error handling
    if (!response.ok) {
      outputDiv.innerText = data.output || "Something went wrong";
      return;
    }

    outputDiv.innerText = data.output;

  } catch (error) {
    outputDiv.innerText = "Network error. Try again.";
  }
}


// ✅ Copy button
function copyText() {
  const output = document.getElementById("output").innerText;
  navigator.clipboard.writeText(output);
  alert("Copied!");
}
