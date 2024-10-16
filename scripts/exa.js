import axios from "axios";

let exaApiKey;

export const initializeExa = () => {
  exaApiKey = localStorage.getItem("exaApiKey");
  if (!exaApiKey) {
    console.error("Exa API key not found in localStorage");
  }
};

if (typeof window !== "undefined") {
  initializeExa();
  window.addEventListener("storage", event => {
    if (event.key === "exaApiKey") {
      initializeExa();
    }
  });
}

export async function* exaSearch(content) {
  if (!exaApiKey) {
    yield "Exa API key not found. Please set it in the settings.";
    return;
  }

  try {
    const response = await axios.post(
      "https://api.exa.ai/search",
      {
        query: content,
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
      let summary = [];
      for (const result of response.data.results) {
        const title = result.title || "No title";
        const url = result.url || "#";
        const snippet = result.snippet || "No snippet available";

        yield `Title: ${title}\n`;
        yield `URL: ${url}\n`;
        yield `Snippet: ${snippet}\n\n`;
        yield "---\n\n";

        // Collect titles for summary
        summary.push(title);
      }

      // Generate and yield the summary
      if (summary.length > 0) {
        yield `Summary of results: ${summary.join(", ")}.`;
      } else {
        yield "No results found.";
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
