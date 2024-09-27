import axios from "axios";

let perplexityApiKey;

export const initializePerplexity = () => {
  perplexityApiKey = localStorage.getItem("perplexityApiKey");
  if (!perplexityApiKey) {
    console.error("Perplexity API key not found in localStorage");
  }
};

if (typeof window !== "undefined") {
  initializePerplexity();
  window.addEventListener("storage", event => {
    if (event.key === "perplexityApiKey") {
      initializePerplexity();
    }
  });
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

async function* perplexitySearch(query) {
  if (!perplexityApiKey) {
    yield "Perplexity API key not found. Please set it in the settings.";
    return;
  }

  try {
    const response = await fetch("/api/perplexity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-perplexity-api-key": perplexityApiKey,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    if (data.results) {
      for (const result of data.results) {
        yield `Title: ${result.title}\nURL: ${result.url}\nSnippet: ${result.snippet}\n\n`;
      }
    } else {
      yield "No results found.";
    }
  } catch (error) {
    console.error("Error in perplexitySearch:", error);
    yield `An error occurred while fetching search results from Perplexity: ${error.message}`;
  }
}

export { perplexityResponse, perplexitySearch };
