"use server";

import { EMAIL_EXIST_ERROR, PASSWORD_ERROR, PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR, PASSWORD_REGEX, USERNAME_MIN_LENGTH, USERNAME_MIN_LENGTH_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
}

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine(checkEmailExists, EMAIL_EXIST_ERROR),
  username: z
    .string()
    .min(USERNAME_MIN_LENGTH, USERNAME_MIN_LENGTH_ERROR),
  password: z.string().min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR).regex(PASSWORD_REGEX, PASSWORD_ERROR),
});

export async function logIn(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(data);
  // console.log(result);
  if (!result.success) {
    // console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    return {};
  }
}