/**
 * Mock responses for the Sales Enablement Tool.
 */
const MOCK_RESPONSES = [
  "I can help you with that! Thermax offers a wide range of industrial solutions including boilers, heaters, and water treatment systems. Which specific area are you interested in?",
  "Based on the sales enablement data, we've seen a 15% increase in efficiency for customers using our latest absorption chillers. Would you like to see the case study?",
  "That's a great question. Our sales tool is designed to provide real-time insights into market trends and competitor analysis for the energy sector.",
  "Thermax's absorption cooling systems are world-class. They utilize waste heat to provide cooling, making them extremely environmentally friendly and cost-effective.",
  "I've analyzed the latest performance reports. The TO series boilers are showing exceptional reliability in high-pressure applications. Is there a specific technical specification you need?",
];

/**
 * Simulates a streaming response from an AI service.
 * @param onChunk Callback for each new chunk of text
 * @param onStart Callback when the stream starts (after thinking)
 * @param onEnd Callback when the stream ends
 */
export async function streamMockResponse(
  onChunk: (chunk: string) => void,
  onStart?: () => void,
  onEnd?: () => void,
) {
  // 1. Simulate "Thinking" delay
  await new Promise((resolve) =>
    setTimeout(resolve, 1200 + Math.random() * 800),
  );

  if (onStart) onStart();

  // 2. Select a random response
  const response =
    MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
  const words = response.split(" ");
  let currentText = "";

  // 3. Stream words
  for (let i = 0; i < words.length; i++) {
    currentText += (i === 0 ? "" : " ") + words[i];
    onChunk(currentText);

    // Realistic variable delay between words
    const delay = 30 + Math.random() * 70;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  if (onEnd) onEnd();
}
