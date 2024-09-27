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

  // Implement Exa search functionality here
  yield "Exa search functionality not implemented yet.";
}
