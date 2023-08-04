const apiUrl = "https://api.openai.com/v1/chat/completions";
const apiKey = "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";
const getReviewbtn = document.querySelector("#getReview");
const newReview = document.querySelector("#newReview");

function getReview() {
  const inputText = document.querySelector("#input");
  const input = inputText.value;

  const userMessage = {
    role: "user",
    content: input,
  };

  const systemMessage = {
    role: "system",
    content: `You will be presented with user reviews and your job is to provide a set of tags from the following list. Provide your answer in bullet point form. Choose ONLY from the list of tags provided here (choose either the positive or the negative tag but NOT both)
    - Provides good value for the price OR Costs too much
    - Works better than expected OR Didn't work as well as expected
    - Includes essential features OR Lacks essential features
    - Easy to use OR Difficult to use
    - High quality and durability OR Poor quality and durability
    - Easy and affordable to maintain or repair OR Difficult or costly to maintain or repair
    - Easy to transport OR Difficult to transport
    - Easy to store OR Difficult to store
    - Compatible with other devices or systems OR Not compatible with other devices or systems
    - Safe and user-friendly OR Unsafe or hazardous to use
    - Excellent customer support OR Poor customer support
    - Generous and comprehensive warranty OR Limited or insufficient warranty`,
    
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
      // newReview.textContent = data.choices[0]?.message?.content;
      const tagsArray = data.choices[0]?.message?.content.split("-");

      // Create a list element
      const listElement = document.createElement("ul");

      // Add each tag as a list item
      
      tagsArray.forEach((tag) => {
        const listItem = document.createElement("li");
        listItem.textContent = tag.trim(); // Remove leading and trailing whitespace
        listElement.appendChild(listItem);
      });

      // Display the list of tags
      newReview.innerHTML = "";
      newReview.appendChild(listElement);

      })
    .catch((error) => {
      newReview.textContent = error.message;  
    });
}

getReviewbtn.addEventListener("click", getReview);
