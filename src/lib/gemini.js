const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const MODEL = "gemini-3.5-flash";

export async function generateGeminiResponse(messages) {
  if (!API_KEY) {
    throw new Error("GEMINI_KEY_MISSING");
  }

  // Gemini expects the full conversation with assistant turns marked as "model".
  const contents = messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.text }],
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY,
      },
      body: JSON.stringify({ contents }),
    }
  );

  if (!response.ok) {
    throw new Error("GEMINI_REQUEST_FAILED");
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim();

  if (!text) {
    throw new Error("GEMINI_EMPTY_RESPONSE");
  }

  return text;
}
