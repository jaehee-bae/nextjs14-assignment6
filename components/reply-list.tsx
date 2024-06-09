import { InitialResponses } from "@/app/tweets/[id]/actions";

interface ResponseListProps {
  initialResponses: InitialResponses
}

export default function ReplyList({ initialResponses }: ResponseListProps) {
  console.log(initialResponses);
  return (
    <div>
      <p>댓글 {initialResponses.length}개</p>
      {initialResponses.map((response, index) => (
        <div key={index} className="flex flex-row gap-1">
          <div>{response.response}</div>
          <div>{response.user.username}</div>
        </div>
      ))}
    </div>
  );
}