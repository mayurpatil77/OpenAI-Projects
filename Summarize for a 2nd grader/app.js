const apiUrl = "https://api.openai.com/v1/chat/completions";
const apiKey = "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";
const explainBtn = document.querySelector("#explainBtn");
const Explanation = document.querySelector("#Explanation");

function getExplanation() {
  const inputText = document.querySelector("#input");
  const input = inputText.value;

  const userMessage = {
    role: "user",
    content: input,
  };

  const systemMessage = {
    role: "system",
    content: "Summarize content you are provided with for a second-grade student.",
  };

  const params = {
    messages: [systemMessage, userMessage], 
    model: "gpt-3.5-turbo",
    max_tokens: 500,
    temperature: 0,
  };

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((response) => response.json())
    .then((data) => {
      Explanation.textContent = data.choices[0]?.message?.content;
    })
    .catch((error) => {
      Explanation.textContent = error.message;
    });
}

explainBtn.addEventListener("click", getExplanation);
