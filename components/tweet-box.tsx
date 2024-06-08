import Link from "next/link";
import { redirect } from "next/navigation";

interface TweetProps {
  id: number,
  tweet: string,
  user: {
    username: string,
  },
}

export default function TweetBox({ id, tweet, user }: TweetProps) {
  // if tweet not exist, error handling.
  return (
    <Link href={`/tweets/${id}`}>
      <div className="flex flex-row gap-1 bg-white text-lg font-bold *:p-1 border-2 border-green-700">
        <div>{tweet}</div>
        <div className="bg-yellow-200">{user.username}</div>
      </div>
    </Link>
  );
}