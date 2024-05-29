"use server";

import { EMAIL_EXIST_ERROR, PASSWORD_ERROR, PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR, PASSWORD_REGEX } from "@/lib/constants";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";

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
  password: z.string().min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR).regex(PASSWORD_REGEX, PASSWORD_ERROR),
});

export async function logIn(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (result.success) {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const success = await bcrypt.compare(result.data.password, user!.password);
    if (success) {
      const cookie = await getSession();
      cookie.id = user!.id;
      await cookie.save();
      redirect("/");
    } else {
      return {
        fieldErrors: {
          password: ["Wrong password."],
        }
      }
    }
  } else {
    return result.error.flatten();
  }
}