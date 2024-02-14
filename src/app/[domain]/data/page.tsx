import { notFound } from "next/navigation";

export default async function Page({ params, searchParams }: any) {
  const startTime = performance.now();
  const data = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${searchParams.postId}`,
  );
  const posts = await data.json();
  const endTime = performance.now();
  const responseTime = endTime - startTime;

  const time = {
    startTime,
    endTime,
    responseTime,
  };

  if (posts.length === 0) {
    notFound();
  }

  return (
    <pre>{JSON.stringify({ params, searchParams, time, posts }, null, 2)}</pre>
  );
}
