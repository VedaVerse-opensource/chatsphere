import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function chatGPTResponse(content, model) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: content }],
      model: model,
    });

    return chatCompletion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error(`Error in ${model} response:`, error);
    return `An error occurred while fetching response from ${model}`;
  }
}

// GPT-4
export async function gpt4Response(content) {
  return chatGPTResponse(content, "gpt-4");
}

// GPT-4 Turbo
export async function gpt4oResponse(content) {
  return chatGPTResponse(content, "gpt-4o");
}

// GPT-4 Turbo
export async function gpt4oMiniResponse(content) {
  return chatGPTResponse(content, "gpt-4o-mini");
}

// GPT-3.5 Turbo
export async function gpt35TurboResponse(content) {
  return chatGPTResponse(content, "gpt-3.5-turbo");
}
