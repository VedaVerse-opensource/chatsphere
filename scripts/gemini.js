import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI;

export const initializeGemini = () => {
  const key = localStorage.getItem("geminiApiKey");
  if (key) {
    genAI = new GoogleGenerativeAI(key);
  } else {
    console.error("Gemini API key not found in localStorage");
  }
};

if (typeof window !== "undefined") {
  initializeGemini();
  window.addEventListener("storage", event => {
    if (event.key === "geminiApiKey") {
      initializeGemini();
    }
  });
}

async function* geminiResponse(content, model, contextMessages) {
  try {
    const geminiModel = genAI.getGenerativeModel({ model: model });

    const chat = geminiModel.startChat({
      history: contextMessages.map(msg => ({
        role: msg.role,
        parts: msg.content,
      })),
    });

    const result = await chat.sendMessageStream(content);
    for await (const chunk of result.stream) {
      yield chunk.text();
    }
  } catch (error) {
    console.error(`Error in ${model} response:`, error);
    yield `An error occurred while fetching response from ${model}`;
  }
}

export async function* gemini15ProResponse(content, contextMessages) {
  yield* geminiResponse(content, "gemini-1.5-pro", contextMessages);
}

export async function* gemini15FlashResponse(content, contextMessages) {
  yield* geminiResponse(content, "gemini-1.5-flash", contextMessages);
}

export async function* gemini10ProResponse(content, contextMessages) {
  yield* geminiResponse(content, "gemini-1.0-pro", contextMessages);
}

export default gemini10ProResponse;
