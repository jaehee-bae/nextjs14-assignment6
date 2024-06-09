import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="font-bold bg-gray-200 rounded-full h-12 text-black disabled:bg-neutral-400 disabled:text-gray-700 disabled:cursor-not-allowed hover:bg-neutral-300">
      {pending ? "Loading..." : text}
    </button>
  );
}