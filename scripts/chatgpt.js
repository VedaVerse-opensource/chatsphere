"use client";

let azureOpenAiApiKey = localStorage.getItem("openAiApiKey");
let azureOpenAiEndpoint = "https://vedaverse-openai-api.openai.azure.com/";
let model_name = "VedaVerse-frontend";

export const initializeOpenAI = () => {
  if (!azureOpenAiApiKey) {
    console.error("Azure OpenAI API key or endpoint not found");
  }
};

if (typeof window !== "undefined") {
  initializeOpenAI();
}

async function* chatGPTResponse(content, model, contextMessages) {
  if (!azureOpenAiApiKey) {
    console.error(
      "Azure OpenAI is not initialized. Please check your API key and endpoint.",
    );
    yield "Azure OpenAI not initialized. Please check your API key and reload the page.";
    return;
  }

  try {
    const messages = [...contextMessages, { role: "user", content: content }];

    const response = await fetch(
      `${azureOpenAiEndpoint}openai/deployments/${model_name}/chat/completions?api-version=2023-05-15`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": azureOpenAiApiKey,
        },
        body: JSON.stringify({
          messages: messages,
          model: model_name,
          stream: true,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") return;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices[0]?.delta?.content || "";
            if (content) yield content;
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        }
      }
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
