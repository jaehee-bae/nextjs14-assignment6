"use client";

import Input from "@/components/input";
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import InfoIcon from '@mui/icons-material/Info';
import { useFormState } from "react-dom";
import { createAccount } from "./actions";
import Button from "@/components/button";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="font-bold text-2xl">SIGN IN</div>
      <form action={dispatch} className="flex flex-col gap-3 w-96">
        <Input
          name="username"
          type="text"
          icon={PersonIcon}
          placeholder="Username"
          errors={state?.fieldErrors.username}
          required
        />
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
        <Input
          name="confirm_password"
          type="password"
          icon={LockIcon}
          placeholder="Confirm Password"
          required
          errors={state?.fieldErrors?.confirm_password}
        />
        <Input
          name="bio"
          type="text"
          icon={InfoIcon}
          placeholder="Bio"
          required
          errors={state?.fieldErrors?.bio}
        />
        <Button text="Create Account"></Button>
      </form>
    </div>
  );
}