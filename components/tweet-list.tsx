import db from "@/lib/db";
import { TWEET_NUM_OF_PAGE } from "@/lib/constants";
import TweetBox from "@/components/tweet-box";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

async function getTweets(page: number) {
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
    skip: page * TWEET_NUM_OF_PAGE,
    take: TWEET_NUM_OF_PAGE,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export default async function TweetList() {
  const tweets = await getTweets(0);
  return (
    <div className="flex flex-row gap-2 items-center justify-center min-h-screen">
      <button>
        <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
      </button>
      <div className="flex flex-col gap-2">
        {tweets.map((tweet) => (
          <TweetBox key={tweet.id} {...tweet}></TweetBox>
        ))}
      </div>
      <button>
        <ArrowForwardIosIcon></ArrowForwardIosIcon>
      </button>
    </div>
  );
}