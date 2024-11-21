import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import { promises as fs } from 'fs';
import path from 'path';

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE_URL,
});

export async function POST(request: NextRequest) {
  try {
    const { requirement } = await request.json();

    if (!requirement) {
      throw new Error('Requirement is required');
    }

    // Read the template file
    const templatePath = path.join(process.cwd(), 'app/api/templates/prompt.md');
    const template = await fs.readFile(templatePath, 'utf-8');

    // Construct the prompt
    const prompt = `参考以下的 prompt，为 "${requirement}" 创建 prompt：\n\n${template}`;

    // Create streaming response
    const stream = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      temperature: 0.7,
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    });

    // Set up the headers for streaming response
    const headers = {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    };

    // Create a new ReadableStream
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            // Send the content as a Server-Sent Event
            controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ content })}\n\n`));
          }
        }
        controller.close();
      },
    });

    return new Response(readableStream, { headers });
  } catch (error) {
    console.error('Error generating prompt:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate prompt' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
