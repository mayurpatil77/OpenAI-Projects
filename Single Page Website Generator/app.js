const apiUrl = "https://api.openai.com/v1/chat/completions";
const apiKey = "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";
const getCodebtn = document.querySelector("#getCode");
const websiteCode = document.querySelector("#websiteCode");

function getWebpageCode() {
  const inputText = document.querySelector("#input");
  const input = inputText.value;

  const userMessage = {
    role: "user",
    content: input,
  };

  const systemMessage = {
    role: "system",
    content: "You will be provided with Description, and base on that you have to generate the single page html & css website, make it look beutifull by using background colors and also make it responsive ",
  };

  const params = {
    messages: [systemMessage, userMessage], 
    model: "gpt-3.5-turbo",
    max_tokens: 2000,
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
      websiteCode.textContent = data.choices[0]?.message?.content;
      })
    .catch((error) => {
      websiteCode.textContent = error.message;  
    });
}

getCodebtn.addEventListener("click", getWebpageCode);
