const apiUrl = "https://api.openai.com/v1/chat/completions";
const apiKey = "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";
const getEmojibtn = document.querySelector("#getEmoji");
const showEmoji = document.querySelector("#showEmoji");

function getEmoji() {
  const inputText = document.querySelector("#input");
  const input = inputText.value;

  const userMessage = {
    role: "user",
    content: input,
  };

  const systemMessage = {
    role: "system",
    content: "You will be provided with text, and your task is to translate it into emojis. Do not use any regular text. Do your best with emojis only.   ",
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
      showEmoji.textContent = data.choices[0]?.message?.content;
      })
    .catch((error) => {
      showEmoji.textContent = error.message;  
    });
}

getEmojibtn.addEventListener("click", getEmoji);
