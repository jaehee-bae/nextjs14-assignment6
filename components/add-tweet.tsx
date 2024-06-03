"use client";

import { createTweet } from "@/app/tweets/add/action";
import Input from "@/components/input";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useFormState } from "react-dom";
import Button from "./button";


export default function AddTweet() {
  const [state, action] = useFormState(createTweet, null);
  return (
    <div className="flex flex-col justify-center items-center p-10">
      <form action={action} className="flex flex-col gap-2 pb-10">
        <Input
          name="tweet"
          type="text"
          icon={TextSnippetIcon}
          placeholder="Enter Tweet Message"
          errors={state?.fieldErrors.tweet}
          required
        />
        <Button text="Add Tweet"></Button>
      </form>
    </div>
  );
}