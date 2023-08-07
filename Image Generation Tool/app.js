const apiUrl = "https://api.openai.com/v1/images/generations";
    const apiKey = "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";
    const generateImagebtn = document.querySelector("#generateImage");
    const responseImage = document.querySelector("#responseImage");
    const errorMessage = document.querySelector("#error");

    function getImage() {
      const inputText = document.querySelector("#imageDescription");
      const input = inputText.value;

      const params = {
        prompt: input, 
        size: "1024x1024",
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
          responseImage.src = data.data[0].url;
        })
        .catch((error) => {
          console.log(error.message);
          errorMessage.textContent = "An error occurred. Please try again later.";
        });
    }

    generateImagebtn.addEventListener("click", getImage);
