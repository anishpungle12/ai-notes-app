async function generate() {
  const input = document.getElementById("input").value;
  const outputDiv = document.getElementById("output");

  outputDiv.innerText = "Generating...";

  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: input })
  });

  const data = await response.json();

  console.log(data); // 👈 ADD THIS

  outputDiv.innerText = data.output || "Error: No output received";
}
