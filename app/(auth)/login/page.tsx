"use client";

import Input from "@/components/input";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Button from "@/components/button";
import { useFormState } from "react-dom";
import { logIn } from "./actions";
import WhatshotIcon from '@mui/icons-material/Whatshot';

export default function LogIn() {
  const [state, dispatch] = useFormState(logIn, null);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2">
      <WhatshotIcon className="text-red-500 size-16"></WhatshotIcon>
      <form action={dispatch} className="flex flex-col gap-3 w-96">
        <Input
          name="email"
          type="email"
          icon={EmailIcon}
          placeholder="Email"
          errors={state?.fieldErrors?.email}
          required
        />
        <Input
          name="password"
          type="password"
          icon={LockIcon}
          placeholder="Password"
          required
          errors={state?.fieldErrors?.password}
        />
        <Button text="Log in"></Button>
      </form>
    </div>
  );
}
