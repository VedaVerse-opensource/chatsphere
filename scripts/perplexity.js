import axios from "axios";

let perplexityApiKey;

if (typeof window !== "undefined") {
  perplexityApiKey = localStorage.getItem("perplexityApiKey");
}

async function* perplexityResponse(content, contextMessages) {
  if (!perplexityApiKey) {
    yield "Perplexity API key not found. Please set it in the settings.";
    return;
  }

  try {
    const messages = [...contextMessages, { role: "user", content: content }];
    const response = await axios.post(
      "https://api.perplexity.ai/chat/completions",
      {
        model: "mistral-7b-instruct",
        messages: messages,
        stream: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${perplexityApiKey}`,
        },
        responseType: "text",
      },
    );

    const lines = response.data.split("\n");
    for (const line of lines) {
      if (line.startsWith("data: ")) {
        try {
          const data = JSON.parse(line.slice(6));
          if (data.choices && data.choices[0].delta.content) {
            yield data.choices[0].delta.content;
          }
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
        }
      }
    }
  } catch (error) {
    console.error("Error in perplexityResponse:", error);
    yield "An error occurred while fetching response from Perplexity. Please check your API key and try again.";
  }
}

export default perplexityResponse;
