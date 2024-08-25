import {
  BedrockRuntimeClient,
  ConverseCommand,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

// Initialize the Bedrock client
const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const modelId = "cohere.embed-english-v3";

// Function to generate embeddings
export async function generateEmbeddings(text: string) {
  console.log("started generating...");

  const command = new InvokeModelCommand({
    modelId,
    body: JSON.stringify({ texts: [text], input_type: "search_query" }),
  });

  try {
    const response = await client.send(command);

    // Assuming `response` is the object you provided
    const bodyUint8Array = response.body; // Extract the body

    // Convert Uint8Array to a string
    const bodyString = new TextDecoder().decode(bodyUint8Array);

    // Parse the string as JSON
    const bodyJson = JSON.parse(bodyString);

    // Now you can access the JSON data
    return bodyJson.embeddings[0];
  } catch (error) {
    console.error("Error invoking model:", error);
    throw error;
  }
}
