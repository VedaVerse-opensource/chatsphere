import axios from "axios";

export async function POST(request) {
  const { query } = await request.json();
  const perplexityApiKey = request.headers.get("x-perplexity-api-key");

  if (!perplexityApiKey) {
    return new Response(
      JSON.stringify({ error: "Perplexity API key not found" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const response = await axios.post(
      "https://api.perplexity.ai/search",
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${perplexityApiKey}`,
        },
      },
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in Perplexity search:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while fetching search results",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
