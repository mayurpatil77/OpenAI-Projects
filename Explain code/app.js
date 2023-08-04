const apiUrl = "https://api.openai.com/v1/chat/completions";
const apiKey = "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";
const codebtn = document.querySelector("#codebtn");
const Explnation = document.querySelector("#Explnation");

function getCodeExplanation() {
  const inputText = document.querySelector("#input");
  const input = inputText.value;

  const userMessage = {
    role: "user",
    content: input,
  };

  const systemMessage = {
    role: "system",
    content: "You will be provided with a piece of code, and your task is to explain it in a concise way.",
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
      console.log(data)
      Explnation.textContent = data.choices[0]?.message?.content;
    })
    .catch((error) => {
      Explnation.textContent = error.message;
    });
}

codebtn.addEventListener("click", getCodeExplanation);
