import axios from "axios";

export async function POST(request) {
  const { prompt, apiKey, contextMessages } = await request.json();

  console.log("Received request with prompt:", prompt);
  console.log("API Key present:", !!apiKey);

  const formattedMessages = contextMessages
    .map(
      msg => `${msg.role === "user" ? "Human" : "Assistant"}: ${msg.content}`,
    )
    .join("\n\n");

  const formattedPrompt = `${formattedMessages}\n\nHuman: ${prompt}\n\nAssistant:`;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await axios.post(
          "https://api.anthropic.com/v1/complete",
          {
            prompt: formattedPrompt,
            model: "claude-v1",
            max_tokens_to_sample: 300,
            stop_sequences: ["\n\nHuman:"],
            temperature: 0.8,
            stream: true,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-API-Key": apiKey,
              "anthropic-version": "2023-06-01",
            },
            responseType: "stream",
          },
        );

        response.data.on("data", chunk => {
          const lines = chunk.toString().split("\n");
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = JSON.parse(line.slice(6));
              if (data.completion) {
                controller.enqueue(encoder.encode(data.completion));
              }
            }
          }
        });

        response.data.on("end", () => {
          controller.close();
        });
      } catch (error) {
        console.error("Error calling Claude API:", error);
        controller.enqueue(encoder.encode("An error occurred"));
        controller.close();
      }
    },
  });

  return new Response(stream);
}
