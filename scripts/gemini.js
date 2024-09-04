import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

async function* geminiResponse(content, model) {
  try {
    const geminiModel = genAI.getGenerativeModel({ model: model });

    const result = await geminiModel.generateContentStream(content);
    for await (const chunk of result.stream) {
      yield chunk.text();
    }
  } catch (error) {
    console.error(`Error in ${model} response:`, error);
    yield `An error occurred while fetching response from ${model}`;
  }
}

export async function* gemini15ProResponse(content) {
  yield* geminiResponse(content, "gemini-1.5-pro");
}

export async function* gemini15FlashResponse(content) {
  yield* geminiResponse(content, "gemini-1.5-flash");
}

export async function* gemini10ProResponse(content) {
  yield* geminiResponse(content, "gemini-1.0-pro");
}

export default gemini10ProResponse;