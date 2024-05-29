import Box from "@/components/box";
import Button from "@/components/button";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2">
      <h1 className="text-2xl font-bold">Profile</h1>
      <Box title={user.username}></Box>
      <Box title={user.email}></Box>
      <Box title={user.bio}></Box>
      <form action={logOut}>
        <button className="btn btn-outline btn-error">Log Out</button>
      </form>
    </div>
  );
}