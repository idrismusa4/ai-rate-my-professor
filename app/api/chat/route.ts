import { NextRequest, NextResponse } from "next/server";
import { invokeLlamaModel } from "./llama";
import { generateEmbeddings } from "./embed";
import { queryPineconeDatabase } from "./pinecone_query";

// import { NextApiRequest, NextApiResponse } from 'next';
// import { NextResponse } from 'next/server';

// // Assuming these are your imported functions
// import { generateEmbeddings } from './path/to/generateEmbeddings';
// import { queryPineconeDatabase } from './path/to/queryPineconeDatabase';
// import { invokeLlamaModel } from './path/to/invokeLlamaModel';


// Function to parse the JSON body from the NextRequest
async function readRequestBody(req: NextRequest) {
  const body = await req.text();  // read the request body as text
  return JSON.parse(body);  // parse it as JSON
}

// POST function to handle incoming requests
export async function POST(req: NextRequest) {
  try {
    const { messages } = await readRequestBody(req);

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
