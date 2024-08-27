import {
  BedrockRuntimeClient,
  ConverseCommand,
  Message,
} from "@aws-sdk/client-bedrock-runtime";

// Initialize the Bedrock client
const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const modelId = "meta.llama3-70b-instruct-v1:0";

// Function to invoke the model with chat history
export async function invokeLlamaModel(messages: Message[]) {
  const command = new ConverseCommand({
    modelId,
    messages,
    inferenceConfig: { maxTokens: 512, temperature: 0.5, topP: 0.9 },
  });

  try {
    const response = await client.send(command);
    return response;
  } catch (error) {
    console.error("Error invoking model:", error);
    throw error;
  }
}
