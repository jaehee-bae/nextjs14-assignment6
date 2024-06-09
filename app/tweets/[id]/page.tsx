import { notFound } from "next/navigation";
import { getResponses, getTweet } from "./actions";
import { getDateToString } from "@/lib/utils";
import { AddReply } from "@/components/add-reply";
import ReplyList from "@/components/reply-list";

export default async function TweetDetailPage({ params, }: { params: { id: string } }) {
  const tweetId = Number(params.id);
  if (isNaN(tweetId)) {
    return notFound();
  }
  const tweet = await getTweet(tweetId);
  if (!tweet) {
    return notFound();
  }
  const initialResponses = await getResponses(tweetId);
  return (
    <div className="flex flex-col gap-3">
      <h1>{tweet!.tweet}</h1>
      <h2>{tweet!.user.username}</h2>
      <h2>{getDateToString(tweet!.created_at)}</h2>
      <h3>좋아요 {tweet!.Like.length} 개</h3>
      <AddReply tweetId={tweet!.id}></AddReply>
      <ReplyList initialResponses={initialResponses}></ReplyList>
    </div>
  );
}