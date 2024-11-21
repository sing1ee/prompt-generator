import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
  try {
    const { requirement } = await request.json();

    if (!requirement) {
      return NextResponse.json(
        { error: 'Requirement is required' },
        { status: 400 }
      );
    }

    const prompt = `# Generated Prompt

## Context
You are an AI assistant tasked with ${requirement.toLowerCase()}

## Instructions
1. Understand the user's requirements thoroughly
2. Provide detailed and relevant responses
3. Maintain a professional and helpful tone
4. Consider all aspects of the request

## Format
Please structure your response in a clear and organized manner, using appropriate headings and bullet points where necessary.

## Additional Notes
- Be concise yet comprehensive
- Use examples when helpful
- Maintain clarity and precision`;

    return NextResponse.json({ prompt });
  } catch (error) {
    console.error('Error generating prompt:', error);
    return NextResponse.json(
      { error: 'Failed to generate prompt' },
      { status: 500 }
    );
  }
}
