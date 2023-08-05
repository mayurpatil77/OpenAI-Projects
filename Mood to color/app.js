const apiUrl = "https://api.openai.com/v1/chat/completions";
const apiKey = "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";
const btn = document.querySelector("#btn");
const Sentiment = document.querySelector("#Sentiment");
const container = document.querySelector(".container");

function getSentiment() {
  const inputText = document.querySelector("#input");
  const input = inputText.value;

  const userMessage = {
    role: "user",
    content: input,
  };

  const systemMessage = {
    role: "system",
    content: `You will be provided with a description of a mood, and your task is to generate the CSS Hash Color Value and only reply that in Response, No Text just Color Code`
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
      document.body.style.backgroundColor = data.choices[0].message.content;
    })
    .catch((error) => {
      Sentiment.textContent = "Oops ! Something Went Wrong";
    });
}

btn.addEventListener("click", getSentiment);
