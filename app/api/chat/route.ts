<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import { invokeLlamaModel } from "./llama";
import { generateEmbeddings } from "./embed";
import { queryPineconeDatabase } from "./pinecone_query";
=======
import { NextApiRequest, NextApiResponse } from "next";
import { invokeLlamaModel } from "./llama";
import { generateEmbeddings } from "./embed";
import { queryPineconeDatabase } from "./pinecone_query";
import { NextRequest, NextResponse } from "next/server";
>>>>>>> 1a70c3c (added user authentication and search functional)

// import { NextApiRequest, NextApiResponse } from 'next';
// import { NextResponse } from 'next/server';

// // Assuming these are your imported functions
// import { generateEmbeddings } from './path/to/generateEmbeddings';
// import { queryPineconeDatabase } from './path/to/queryPineconeDatabase';
// import { invokeLlamaModel } from './path/to/invokeLlamaModel';

<<<<<<< HEAD
async function readRequestBody(req: NextRequest): Promise<string> {
  const reader = req.body?.getReader();
  const decoder = new TextDecoder();
  let body = "";

  if (reader) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
  }

=======
async function readRequestBody(req: NextApiRequest) {
  const reader = req.body.getReader();
  const decoder = new TextDecoder();
  let body = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    body += decoder.decode(value, { stream: true });
  }
  body += decoder.decode();
>>>>>>> 1a70c3c (added user authentication and search functional)
  return body;
}

// POST function to handle incoming requests
<<<<<<< HEAD
export async function POST(req: NextRequest) {
=======
export async function POST(req: NextApiRequest, res: NextApiResponse) {
>>>>>>> 1a70c3c (added user authentication and search functional)
  try {
    const body = await readRequestBody(req);
    const { messages } = JSON.parse(body);

    const lastMessageIndex = messages.length - 1;
    const lastMessageText = messages[lastMessageIndex].content[0].text;

    const embeddingResponse = await generateEmbeddings(lastMessageText);
    const pineconeResponse = await queryPineconeDatabase(embeddingResponse);

    const resultString =
      "Returned results: " +
      (pineconeResponse.matches
        .map((match) =>
          JSON.stringify({
            name: match?.metadata?.name,
            designation: match?.metadata?.designation,
            department: match?.metadata?.department,
            reviews: match?.metadata?.reviews,
            courses: match?.metadata?.courses,
          })
        )
        .join("|") || "none");

    const updatedMessages = [
      ...messages.slice(0, lastMessageIndex),
      {
        role: "user",
        content: [
          {
            text: `${lastMessageText} ${resultString}`,
          },
        ],
      },
    ];
    console.log(resultString);

    const llamaResponse = await invokeLlamaModel(updatedMessages);

    const assistantResponse =
      llamaResponse?.output?.message?.content?.[0]?.text ||
      "No response from model.";

    const responseMessages = [
      ...messages,
      { role: "assistant", content: [{ text: assistantResponse }] },
    ];

    return NextResponse.json({ history: responseMessages });
  } catch (error) {
    console.error("Invocation failed:", error);
    return NextResponse.json(
      { error: "Failed to invoke LLaMA model." },
      { status: 500 }
    );
  }
}
