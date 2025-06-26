import { NextApiRequest, NextApiResponse } from "next";
import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";

// Store the model globally to avoid reloading
let model: use.UniversalSentenceEncoder | null = null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { message } = req.body;

    // Load model only once
    if (!model) {
      model = await use.load();
      console.log("Model loaded successfully");
    }

    // Convert text to tensor embeddings (mathematical representations)
    const embeddings = await model.embed([message]);

    // Get the actual values from tensor (512-dimensional vector)
    const messageVector = await embeddings.array();

    // Simple response based on message content
    const response = await generateResponse(messageVector[0], message);

    return res.status(200).json({ response });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Failed to process message" });
  }
}

// Simple response generation based on message analysis
async function generateResponse(vector: number[], originalMessage: string) {
  // Calculate message magnitude (rough indication of complexity)
  const magnitude = tf.tensor(vector).norm().dataSync()[0];

  if (magnitude > 10) {
    return "That's an interesting complex question! Let me help you with that...";
  } else if (originalMessage.toLowerCase().includes("help")) {
    return "I'm here to help! What do you need assistance with?";
  } else {
    return "I understand your message. How can I assist you further?";
  }
}
