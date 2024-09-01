import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const { prompt, apiKey } = await request.json();

    console.log("Received request with prompt:", prompt);
    console.log("API Key present:", !!apiKey);

    // Format the prompt correctly
    const formattedPrompt = `\n\nHuman: ${prompt}\n\nAssistant:`;

    const response = await axios.post(
      "https://api.anthropic.com/v1/complete",
      {
        prompt: formattedPrompt,
        model: "claude-v1",
        max_tokens_to_sample: 300,
        stop_sequences: ["\n\nHuman:"],
        temperature: 0.8,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
          "anthropic-version": "2023-06-01",
        },
      },
    );

    console.log("Received response from Claude API");
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(
      "Error calling Claude API:",
      error.response ? error.response.data : error.message,
    );
    return NextResponse.json(
      { error: "Error calling Claude API", details: error.message },
      { status: 500 },
    );
  }
}
