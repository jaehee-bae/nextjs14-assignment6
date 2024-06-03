"use server";

import db from "@/lib/db";
import { TWEET_NUM_OF_PAGE } from "@/lib/constants";
import { Prisma } from "@prisma/client";

export async function getTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      user: {
        select: {
          username: true,
        }
      }
    },
    skip: (page - 1) * TWEET_NUM_OF_PAGE,
    take: TWEET_NUM_OF_PAGE,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getTweets>;