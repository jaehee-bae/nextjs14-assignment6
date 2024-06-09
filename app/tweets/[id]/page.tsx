import { notFound } from "next/navigation";
import { getLikeStatus, getResponses, getTweet } from "./actions";
import { getDateToString } from "@/lib/utils";
import { AddReply } from "@/components/add-reply";
import getSession from "@/lib/session";
import db from "@/lib/db";
import { unstable_cache, revalidateTag } from "next/cache";

// Caching Tweet Detail
const getCachedTweet = unstable_cache(getTweet, ["tweet-detail"], {
  tags: ["tweet-detail"],
  revalidate: 60,
});

// Caching Like
function getCachedLikeStatus(tweetId: number, userId: number) {
  const cachedOperation = unstable_cache(
    (tweetId) => getLikeStatus(tweetId, userId),
    ["product-like-status"],
    {
    tags: [`like-status-${tweetId}`],
  });
  return cachedOperation(tweetId);
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getCachedTweet(id);
  if (!tweet) {
    return notFound();
  }
  const initialResponses = await getResponses(id);
  const session = await getSession();

  const likeTweet = async () => {
    "use server";
    const session = await getSession();
    try {
      await db.like.create({
        data: {
          tweetId: id,
          userId: session.id!,
        },
      });
      revalidateTag(`like-status-${id}`);
    } catch (e) {}
  };
  const dislikeTweet = async () => {
    "use server";
    try {
      const session = await getSession();
      await db.like.delete({
        where: {
          id: {
            tweetId: id,
            userId: session.id!,
          },
        },
      });
      revalidateTag(`like-status-${id}`);
    } catch (e) {}
  }
  const { likeCount, isLiked } = await getCachedLikeStatus(id, session.id!);
  return (
    <div className="flex flex-col gap-3 p-10">
      <div className="border-2 p-2 *:font-black">
        <div className="flex justify-end bg-black">
          {tweet!.user.username}
        </div>
        <div className="p-2">
          {tweet!.tweet}
        </div>
        <div className="flex flex-row gap-2 justify-end">
          {/* <p>{getDateToString(tweet!.created_at)}</p> */}
          <p>좋아요 {likeCount} 개</p>
          <p>댓글 {tweet!._count.Response}개</p>
        </div>
        <form action={isLiked ? dislikeTweet : likeTweet}>
          <button
            className={`border-2 rounded-md p-2 hover:bg-green-400 
            ${isLiked ? 'bg-blue-800' : 'bg-black'}`}
          >
            좋아요
          </button>
        </form>
      </div>
      <AddReply tweetId={tweet!.id}></AddReply>
      {initialResponses.map((response, index) => (
        <div key={index} className="flex flex-row gap-1 border-2 p-1 justify-between">
          <div>{response.response}</div>
          <div className="bg-black">{response.user.username}</div>
        </div>
      ))}
    </div>
  );
}