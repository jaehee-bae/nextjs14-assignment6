import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="w-96 font-bold bg-gray-200 rounded-full h-12 disabled:bg-neutral-400 disabled:text-gray-700 disabled:cursor-not-allowed hover:bg-neutral-300">
      {pending ? "Loading..." : text}
    </button>
  );
}