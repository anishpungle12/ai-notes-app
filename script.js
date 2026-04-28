async function generate() {
  const input = document.getElementById("input").value;
  const outputDiv = document.getElementById("output");

  if (!input.trim()) {
    outputDiv.innerText = "Please enter some text";
    return;
  }

  outputDiv.innerText = "Generating...";

  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: input })
  });

  const data = await response.json();

  outputDiv.innerText = data.output;
}


// ✅ Separate function (NOT inside generate)
function copyText() {
  const output = document.getElementById("output").innerText;
  navigator.clipboard.writeText(output);
}
