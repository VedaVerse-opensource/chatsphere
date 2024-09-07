import axios from "axios";

let exaApiKey;

if (typeof window !== "undefined") {
  exaApiKey = localStorage.getItem("exaApiKey");
}

async function* exaSearch(query) {
  if (!exaApiKey) {
    yield "Exa API key not found. Please set it in the settings.";
    return;
  }

  try {
    const response = await axios.post(
      "https://api.exa.ai/search",
      {
        query: query,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": exaApiKey,
        },
      },
    );

    if (response.data && response.data.results) {
      yield "Search Results:\n\n";
      for (const result of response.data.results) {
        yield `Title: ${result.title || "No title"}\n`;
        yield `URL: ${result.url || "#"}\n`;
        yield `Snippet: ${result.snippet || "No snippet available"}\n\n`;
        yield "---\n\n";
      }
    } else {
      yield "No results found.";
    }
  } catch (error) {
    console.error("Error in exaSearch:", error);
    yield "An error occurred while fetching search results from Exa. Please check your API key and try again.";
  }
}

export default exaSearch;
