const apiKey = "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";
const apiUrl = "https://api.openai.com/v1/chat/completions";
const btn = document.querySelector("#btn");
const Sentiment = document.querySelector("#Sentiment");

function getSentiment() {
  const inputText = document.querySelector("#input");
  const input = inputText.value;

  const userMessage = {
    role: "user",
    content: input,
  };

  const systemMessage = {
    role: "system",
    content: "You will be provided with a tweet, and your task is to classify its sentiment as positive, neutral, or negative.",
  };

  const params = {
    messages: [systemMessage, userMessage], 
    model: "gpt-3.5-turbo",
    max_tokens: 200,
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
      Sentiment.textContent = " ⏩ " + data.choices[0].message.content;
    })
    .catch((error) => {
      Sentiment.textContent = error.message;
    });
}

btn.addEventListener("click", getSentiment);
