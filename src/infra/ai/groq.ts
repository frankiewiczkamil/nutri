import { createPromptText } from './prompt.ts';

const GROQ_API_KEY = localStorage.GROQ_API_KEY;

export function ask(description: string) {
  return fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: createPromptText(description),
        },
      ],
    }),
  })
    .then((response) => response.json())
    .then((data) => JSON.parse(data.choices[0].message.content));
}
