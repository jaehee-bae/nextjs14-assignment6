import db from "@/lib/db";
import { getDateToString } from "@/lib/utils";
import { notFound } from "next/navigation";

async function getTweet(id: number) {
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
      Like: true,
    }
  })
  return tweet;
}

export default async function TweetDetail({ params, }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }
  return (
    <div className="flex flex-col gap-3">
      <h1>{tweet.tweet}</h1>
      <h2>{tweet.user.username}</h2>
      <h2>{getDateToString(tweet.created_at)}</h2>
      <h3>좋아요 {tweet.Like.length} 개</h3>
    </div>
  );
}