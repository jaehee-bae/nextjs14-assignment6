"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { z } from "zod";

const formSchema = z.object({
  reply: z
    .string()
    .trim()
    .min(1),
});

export async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        }
      },
      _count: {
        select: {
          Response: true,
          Like: true,
        }
      }
    }
  })
  return tweet;
}
export type TweetInfo = Prisma.PromiseReturnType<typeof getTweet>;

export async function getIsLiked(id: number) {
  const session = await getSession();
  const like = await db.like.findUnique({
    where: {
      id: {
        tweetId: id,
        userId: session.id!,
      },
    },
  });
  return Boolean(like);
}

export async function getResponses(tweetId: number) {
  const comments = await db.response.findMany({
    select: {
      id: true,
      response: true,
      user: {
        select: {
          username: true,
        }
      }
    },
    where: {
      tweetId: tweetId,
    }
  });
  return comments;
}
export type InitialResponses = Prisma.PromiseReturnType<typeof getResponses>;

export async function createReply(prevState: any, formData: FormData) {
  console.log(formData);
  const data = {
    reply: formData.get("reply"),
    tweetId: formData.get("tweetId"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    console.log(result.error.flatten());
  } else {
    console.log(data.tweetId);
    const session = await getSession();
    if (session.id) {
      const newResponse = await db.response.create({
        data: {
          response: result.data.reply,
          user: {
            connect: {
              id: session.id,
            }
          },
          tweet: {
            connect: {
              id: Number(data.tweetId),
            }
          }
        },
        select: {
          id: true,
        },
      });
      console.log(`Create newResponse: ${newResponse}`);
    }
  }
}