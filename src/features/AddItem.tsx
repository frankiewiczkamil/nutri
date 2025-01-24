import { useState } from "react";

export type AddItemProps = {
  add: (description: string) => void;
};

export function AddItem({ add }: Readonly<AddItemProps>) {
  const [description, setDescription] = useState("");
  function onAdd() {
    add(description);
    setDescription("");
  }
  return (
    <div className="flex flex-col space-y-2">
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full h-24 border border-gray-300 p-2"
        placeholder="Enter your meal description"
      ></textarea>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 self-end"
        onClick={onAdd}
      >
        Add
      </button>
    </div>
  );
}
