import { currentProfile } from "@/lib/current-profile";
import React from "react";
import { RedirectToSignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ServerSidebar } from "@/components/server/server-sidebar";

type Props = {
  children: React.ReactNode;
  params: { serverId: string };
};

const ServerIdPage = async ({ children, params }: Props) => {
  const profile = await currentProfile();
  const { redirectToSignIn } = await auth();

  if (!profile) return redirectToSignIn();

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) return redirect("/");
  return (
    <div className="h-full">
      <div className="fixed hidden md:flex h-full w-60 z-20 flex-col inset-y-0">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerIdPage;
