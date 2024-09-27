import Groq from "groq-sdk";

let groq;

export const initializeGroq = () => {
  const key = localStorage.getItem("groqApiKey");
  if (key) {
    groq = new Groq({
      apiKey: key,
      dangerouslyAllowBrowser: true,
    });
  } else {
    console.error("Groq API key not found in localStorage");
  }
};

if (typeof window !== "undefined") {
  initializeGroq();
  window.addEventListener("storage", event => {
    if (event.key === "groqApiKey") {
      initializeGroq();
    }
  });
}

async function* groqResponse(content, contextMessages) {
  if (!groq) {
    console.error("Groq SDK is not initialized. Please check your API key.");
    yield "Groq SDK not initialized. Please check your API key and reload the page.";
    return;
  }

  try {
    const messages = [...contextMessages, { role: "user", content: content }];
    const stream = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.1-70b-versatile",
      stream: true,
    });

    for await (const chunk of stream) {
      yield chunk.choices[0]?.delta?.content || "";
    }
  } catch (error) {
    console.error("Error in groqResponse:", error);
    yield "An error occurred while fetching response from Groq: " + error.message;
  }
}

export default groqResponse;
