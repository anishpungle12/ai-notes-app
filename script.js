async function generate() {
  const input = document.getElementById("input").value;
  const outputDiv = document.getElementById("output");

  outputDiv.innerText = "Generating...";

  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: input
    })
  });

  const data = await response.json();

  outputDiv.innerText = data.output;
}