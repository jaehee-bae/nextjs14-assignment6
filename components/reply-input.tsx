import { InputHTMLAttributes } from "react";

interface ReplyInputProps {
  name: string;
  tweetId: number;
  type: string;
  placeholder: string;
  required: boolean;
}

export default function ReplyInput({
  name,
  tweetId,
  ...rest
}: ReplyInputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <input
        type="hidden"
        name="tweetId"
        value={tweetId}
      />
      <input
        name={name} {...rest}
        className="border-2 p-2 rounded-md border-gray-200 basis-3/4">
      </input>
    </div>
  );
}