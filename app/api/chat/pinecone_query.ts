import { Pinecone } from "@pinecone-database/pinecone";
// import fetch from "node-fetch";

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
//   fetch: fetch, // Provide node-fetch to Pinecone
});

const index = pc.index("rate-my-professor").namespace("nile-university");

// Function to query Pinecone database
export async function queryPineconeDatabase(embedding: number[]) {
  console.log("started querying...");

  try {
    const results = await index.query({
      topK: 5,
      includeMetadata: true,
      vector: embedding,
    });

    return results;
  } catch (error) {
    console.error("Error querying database:", error);
    throw error;
  }
}
