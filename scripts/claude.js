"use client";

import axios from "axios";

export async function getClaudeResponse(prompt) {
  try {
    let apiKey = "";
    if (typeof window !== "undefined") {
      apiKey = localStorage.getItem("claudeKey");
    }

    if (!apiKey) {
      throw new Error("API key not found");
    }

    console.log("Sending request to /api/claude");
    const response = await axios.post("/api/claude", {
      prompt: prompt,
      apiKey: apiKey,
    });

    console.log("Received response from /api/claude");
    return response.data.completion;
  } catch (error) {
    console.error(
      "Error calling Claude API:",
      error.response ? error.response.data : error.message,
    );
    throw error;
  }
}
