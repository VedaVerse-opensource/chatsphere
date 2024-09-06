import axios from "axios";

let exaApiKey;

if (typeof window !== "undefined") {
  exaApiKey = localStorage.getItem("exaApiKey");
}

async function* exaResponse(content) {
  if (!exaApiKey) {
    yield "Exa API key not found. Please set it in the settings.";
    return;
  }

  try {
    const response = await axios.post(
      "https://api.exa.ai/search",
      {
        query: content,
        stream: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": exaApiKey,
        },
        responseType: "text",
      },
    );

    let buffer = "";
    for await (const chunk of response.data) {
      buffer += chunk.toString();
      let newlineIndex;
      while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
        const line = buffer.slice(0, newlineIndex).trim();
        buffer = buffer.slice(newlineIndex + 1);
        if (line) {
          try {
            const data = JSON.parse(line);
            if (data.content) {
              yield data.content;
            }
          } catch (parseError) {
            console.error("Error parsing JSON:", parseError, "Line:", line);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error in exaResponse:", error);
    yield "An error occurred while fetching response from Exa. Please check your API key and try again.";
  }
}

export default exaResponse;
