const apiUrl = "https://api.openai.com/v1/chat/completions";
const apiKey = "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";
const getDirectionbtn = document.querySelector("#getDirectionbtn");
const newDirection = document.querySelector("#newDirection");

function getDirection() {
  const inputText = document.querySelector("#input");
  const input = inputText.value;

  const userMessage = {
    role: "user",
    content: input,
  };

  const systemMessage = {
    role: "system",
    content: "You will be provided with a text, and your task is to create a numbered list of turn-by-turn directions from it",
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
      newDirection.textContent = data.choices[0]?.message?.content;
      })
    .catch((error) => {
      newDirection.textContent = error.message;  
    });
}

getDirectionbtn.addEventListener("click", getDirection);
