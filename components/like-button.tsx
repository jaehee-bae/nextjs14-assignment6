"use client";

import { dislikePost, likePost } from "@/app/tweets/[id]/actions";
import { useOptimistic } from "react";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  tweetId,
}: LikeButtonProps) {
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState, payload) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    })
  );
  const onClick = async () => {
    reducerFn(undefined);
    if (isLiked) {
      await dislikePost(tweetId);
    } else {
      await likePost(tweetId);
    }
  };
  return (
    <button
      onClick={onClick}
      className={`border-2 rounded-md p-2 hover:bg-green-400 
      ${state.isLiked ? 'bg-blue-800' : 'bg-black'}`}
    >
      {state.isLiked ? (`좋아요 ${state.likeCount}개`) : "좋아요"}
    </button>
  );
}