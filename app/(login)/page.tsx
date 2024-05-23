"use client";

import Input from "@/components/input";
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Button from "@/components/button";
import { useFormState } from "react-dom";
import { logIn } from "./actions";
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Box from "@/components/box";

export default function LogIn() {
  const [state, dispatch] = useFormState(logIn, null);
  return (
    <div className="flex flex-col items-center justify-center py-40">
      <WhatshotIcon className="text-red-500 size-16"></WhatshotIcon>
      <form action={dispatch}>
        <Input
          name="email"
          type="email"
          icon={EmailIcon}
          placeholder="Email"
          required
        />
        <Input
          name="username"
          type="text"
          icon={PersonIcon}
          placeholder="Username"
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
      <div>
        {state !== null && !state?.fieldErrors ? (<Box title="Welcome back!"></Box>) : ("")}
      </div>
    </div>
  );
}
