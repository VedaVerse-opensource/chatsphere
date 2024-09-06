"use client";

import OpenAI from "openai";

let openai;

// Initialize OpenAI SDK on the client side
if (typeof window !== "undefined") {
  const initializeOpenAI = () => {
    const key = localStorage.getItem("openAiApiKey");
    if (key) {
      openai = new OpenAI({
        apiKey: key,
        dangerouslyAllowBrowser: true,
      });
    } else {
      console.error("OpenAI API key not found in localStorage");
    }
  };

  // Initialize immediately
  initializeOpenAI();

  // Re-initialize when localStorage changes
  window.addEventListener("storage", event => {
    if (event.key === "openAiApiKey") {
      initializeOpenAI();
    }
  });
}

async function* chatGPTResponse(content, model, contextMessages) {
  if (!openai) {
    console.error("OpenAI SDK is not initialized. Please check your API key.");
    yield "OpenAI SDK not initialized. Please check your API key and reload the page.";
    return;
  }

  try {
    const messages = [...contextMessages, { role: "user", content: content }];
    const stream = await openai.chat.completions.create({
      messages: messages,
      model: model,
      stream: true,
    });

    for await (const chunk of stream) {
      yield chunk.choices[0]?.delta?.content || "";
    }
  } catch (error) {
    console.error(`Error in ${model} response:`, error);
    yield `An error occurred while fetching response from ${model}: ${error.message}`;
  }
}

export async function* gpt4Response(content, contextMessages) {
  yield* chatGPTResponse(content, "gpt-4", contextMessages);
}

export async function* gpt4oResponse(content, contextMessages) {
  yield* chatGPTResponse(content, "gpt-4-0613", contextMessages);
}

export async function* gpt4oMiniResponse(content, contextMessages) {
  yield* chatGPTResponse(content, "gpt-4-0613", contextMessages);
}

export async function* gpt35TurboResponse(content, contextMessages) {
  yield* chatGPTResponse(content, "gpt-3.5-turbo", contextMessages);
}
