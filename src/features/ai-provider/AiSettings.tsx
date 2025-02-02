import { useState } from 'react';
import { getGroqApiKey, setGroqApiKey } from '../../infra/ai/groq.ts';
import { invisible } from '../../assets/icons/invisible.tsx';
import { visible } from '../../assets/icons/visible.tsx';

type Props = {};

export function AiSettings({}: Readonly<Props>) {
  const [groqKey, setGroqKey] = useState(getGroqApiKey() || '');
  const [groqKeyVisible, setGroqKeyVisible] = useState(false);

  function onGroqChange(e: React.ChangeEvent<HTMLInputElement>) {
    setGroqKey(e.target.value);
    setGroqApiKey(e.target.value);
  }

  return (
    <div className="flex flex-col space-y-4">
      <a href="https://console.groq.com/keys" className="text-purple-900 hover:underline hover:text-purple-950" target="_blank">
        groq keys
      </a>
      <div className="flex space-y-4 w-full">
        <div className="flex flex-col mr-3 w-full">
          <label htmlFor="groq-key" className="text-sm">
            Groq API Key
          </label>
          <input
            className="w-full border-2 border-blue-600 p-1 focus:border-blue-900 focus:outline-0 focus:border-2 focus:bg-sky-50 hover:bg-sky-50"
            type={groqKeyVisible ? 'text' : 'password'}
            id="groq-key"
            name="groq-key"
            value={groqKey}
            onChange={onGroqChange}
          />
        </div>

        <button className="text-gray-800 hover:text-purple-950" onClick={(_) => setGroqKeyVisible(!groqKeyVisible)}>
          {groqKeyVisible ? invisible : visible}
        </button>
      </div>
    </div>
  );
}
