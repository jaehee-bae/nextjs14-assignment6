"use server";

import { PASSWORD_ERROR, PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR, PASSWORD_REGEX } from "@/lib/constants";
import bcrypt from "bcrypt";
import { z } from "zod";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const formSchema = z.object({
  username: z
    .string({
      required_error: "Username required."
    }),
  email: z
    .string()
    .email(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR)
    .regex(PASSWORD_REGEX, PASSWORD_ERROR),
  confirm_password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR),
  bio: z
    .string()
})
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already exist.",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already exist.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords should be equal.",
        path: ["confirm_password"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
    bio: formData.get("bio"),
  };
  const result = await formSchema.spa(data);
  
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
        bio: result.data.bio,
      },
      select: {
        id: true,
      },
    });
    
    const cookie = await getSession();
    cookie.id = user.id;
    await cookie.save();

    redirect("/");
  }
}