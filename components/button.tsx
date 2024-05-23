import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="font-bold bg-gray-200 rounded-full p-2 w-96 h-12 m-2 disabled:bg-neutral-400 disabled:text-gray-700 disabled:cursor-not-allowed hover:bg-neutral-300">
      {pending ? "Loading..." : text}
    </button>
  );
}