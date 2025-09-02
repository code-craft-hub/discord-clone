"use client";

import { MemberRole } from "@/generated/prisma";
import { ServerWithMembersWithProfiles } from "@/types";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

type Props = {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
};

export const ServerHeader = ({ server, role }: Props) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
          <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
            {server.name}
            <ChevronDown className="size-5 ml-auto" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px] ">
          {isModerator && (
            <DropdownMenuItem
              // TODO: server data is passed here into the global state, how are they distinguished?
              onClick={() => onOpen("invite", { server })}
              className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
            >
              Invite People
              <UserPlus className="size-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => onOpen("editServer", { server })}
            >
              Server Settings
              <Settings className="size-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => onOpen("members", { server })}
            >
              Manage Members
              <Users className="size-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuItem
              className="px-3 py-2 text-sm cursor-pointer"
              onClick={() => onOpen("createChannel", { server })}
            >
              Create Channel
              <PlusCircle className="size-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {isModerator && <DropdownMenuSeparator />}
          {isAdmin && (
            <DropdownMenuItem
              className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
              onClick={() => onOpen("deleteServer", { server })}
            >
              Delete Server
              <Trash className="size-4 ml-auto" />
            </DropdownMenuItem>
          )}
          {!isAdmin && (
            <DropdownMenuItem
              className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
              onClick={() => onOpen("leaveServer", { server })}
            >
              Leave Server
              <LogOut className="size-4 ml-auto" />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
