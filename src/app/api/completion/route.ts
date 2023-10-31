import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
// /api/completion
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  const { prompt } = await req.json();


  /**
 * Handle POST request to /api/completion
 * Generates AI-powered text completion based on user input.
 * Expects 'prompt' in the request body to continue the text.
 * Uses OpenAI's GPT-3.5 model to complete the user's train of thought.
 */

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a helpful AI embedded in a text editor app that is used to autocomplete sentences, The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
        AI is a well-behaved and well-mannered individual.AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.`,
      },
      {
        role: "user",
        content: `
        I am writing a piece of text in a text editor app. Help me complete my train of thought here: ##${prompt}##
        keep the tone of the text consistent with the rest of the text. keep the response short and sweet.`,
      },
    ],
    stream: true,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}