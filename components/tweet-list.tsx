"use client";

import TweetBox from "@/components/tweet-box";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from "react";
import { TWEET_NUM_OF_PAGE } from "@/lib/constants";
import { InitialTweets, getTweets } from "@/app/(home)/actions";
// import Toast from "./toast";

interface TweetListProps {
  initialTweets: InitialTweets
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [page, setPage] = useState(1);
  const [isBack, setIsBack] = useState(false);
  const [isNext, setIsNext] = useState(initialTweets.length >= TWEET_NUM_OF_PAGE);
  const onBackClick = async () => {
    const prevPage = page - 1;
    setPage(prevPage);
    const newTweets = await getTweets(prevPage);
    setTweets(newTweets);
    setIsNext(true);
    if (prevPage === 1) {
      setIsBack(false);
    }
  };
  const onNextClick = async () => {
    const nextPage = page + 1;
    const newTweets = await getTweets(nextPage);
    if (newTweets.length > 0) {
      setPage(nextPage);
      setTweets(newTweets);
      setIsBack(true);
    } else {
      setIsNext(false);
    }
  };
  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      {tweets.length === 0 ?
        <div className="font-bold text-red-600 text-xl">
          등록된 글이 없습니다.
        </div> :
        <>
          <button onClick={onBackClick} disabled={!isBack}>
            <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
          </button>
          <div className="flex flex-col gap-2">
            {tweets.map((tweet) => (
              <TweetBox key={tweet.id} {...tweet}></TweetBox>
            ))}
          </div>
          <button onClick={onNextClick} disabled={!isNext}>
            <ArrowForwardIosIcon></ArrowForwardIosIcon>
          </button>
        </>
      }
      {/* <Toast msg="마지막 페이지입니다." isShow={!isNext}></Toast> */}
    </div>
  );
}