import { createPromptText } from './prompt.ts';

let GROQ_API_KEY = localStorage.GROQ_API_KEY;

export function getGroqApiKey() {
  return GROQ_API_KEY;
}
export function setGroqApiKey(apiKey: string) {
  GROQ_API_KEY = apiKey;
  localStorage.GROQ_API_KEY = apiKey;
}

export function ask(description: string) {
  return fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getGroqApiKey()}`,
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
