"use client";

import { useFormState } from "react-dom";
import ReplyInput from "./reply-input";
import { createReply } from "@/app/tweets/[id]/actions";
import { useEffect, useState } from "react";
import Button from "./button";

interface AddReplyProps {
  tweetId: number;
}

export function AddReply({ tweetId }: AddReplyProps) {
  const [state, dispatch] = useFormState(createReply, null);
  const [inputValue, setInputValue] = useState('');
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    setIsButtonVisible(inputValue.trim().length > 0);
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  return (
    <form action={dispatch} className="flex flex-row gap-2 justify-between">
      <ReplyInput
        name="reply"
        type="text"
        placeholder="Write reply"
        required={false}
        value={inputValue}
        tweetId={tweetId}
        onChange={handleInputChange}
      >
      </ReplyInput>
      { isButtonVisible && <button className="p-2 rounded-full border-2">REPLY</button> }
    </form>
  );
}