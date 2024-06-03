import TweetList from "@/components/tweet-list";
import { getTweets } from "./actions";

export default async function Home() {
  const initialTweets = await getTweets(1);
  return (
      <TweetList initialTweets={initialTweets}></TweetList>
  );
}