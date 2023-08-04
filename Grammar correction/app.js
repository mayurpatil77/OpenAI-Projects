const apiUrl = "https://api.openai.com/v1/chat/completions";
const apiKey = "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";
const correctbtn = document.querySelector("#correctbtn");
const correctSentence = document.querySelector("#correctSentence");

function getcorrectSentence() {
  const inputText = document.querySelector("#input");
  const input = inputText.value;

  const userMessage = {
    role: "user",
    content: input,
  };

  const systemMessage = {
    role: "system",
    content: "You will be provided with statements, and your task is to convert them to standard English.",
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
      
      correctSentence.textContent = " ⏩ " + data.choices[0]?.message?.content;
    })
    .catch((error) => {
      correctSentence.textContent = error.message;
    });
}

correctbtn.addEventListener("click", getcorrectSentence);
