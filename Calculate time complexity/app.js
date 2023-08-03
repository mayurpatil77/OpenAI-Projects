const apiUrl = "https://api.openai.com/v1/chat/completions";
const apiKey = "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";
const calculateBtn = document.querySelector("#calculateBtn");
const timeComplexity = document.querySelector("#timeComplexity");

function getTimeComplexity() {
  const inputText = document.querySelector("#code");
  const input = inputText.value;

  const userMessage = {
    role: "user",
    content: input,
  };

  const systemMessage = {
    role: "system",
    content: "You will be provided with code, and your task is to calculate its time complexity.",
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
      console.log(data)
      timeComplexity.textContent = " ⏩ " + data.choices[0]?.message?.content;
    })
    .catch((error) => {
      timeComplexity.textContent = error.message;
    });
}

calculateBtn.addEventListener("click", getTimeComplexity);
