"use client";

import { ChannelType, MemberRole } from "@/generated/prisma";
import { ServerWithMembersWithProfiles } from "@/types";
import React from "react";
import { ActionTooltip } from "../action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

type Props = {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
};

export const ServerSection = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: Props) => {
  const { onOpen } = useModal();
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionTooltip label="Create Channel">
          <button
            onClick={() => onOpen("createChannel", { channelType })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            aria-label="Create Channel"
          >
            <Plus className="size-4" />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionTooltip label="Manage Members">
          <button
            onClick={() => onOpen("members", { server })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            aria-label="Create members"
          >
            <Settings className="size-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};
