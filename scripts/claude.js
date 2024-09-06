"use client";

import axios from "axios";

export async function* getClaudeResponse(prompt, contextMessages) {
  try {
    let apiKey = "";
    if (typeof window !== "undefined") {
      apiKey = localStorage.getItem("claudeKey");
    }

    if (!apiKey) {
      throw new Error("API key not found");
    }

    console.log("Sending request to /api/claude");
    const response = await fetch("/api/claude", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, apiKey, contextMessages }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      yield decoder.decode(value);
    }
  } catch (error) {
    console.error("Error calling Claude API:", error);
    yield "An error occurred while fetching response from Claude";
  }
}
