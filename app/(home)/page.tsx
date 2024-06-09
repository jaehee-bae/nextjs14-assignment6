import TweetList from "@/components/tweet-list";
import { getTweets } from "./actions";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Link from "next/link";

export default async function Home() {
  const initialTweets = await getTweets(1);
  return (
    <div className="flex flex-col p-10 items-center gap-2">
      <Link href="/tweets/add">
        <AddCircleIcon className="size-14"></AddCircleIcon>
      </Link>
      <TweetList initialTweets={initialTweets}></TweetList>
    </div>
  );
}