import { Server, Member, Profile } from "@/generated/prisma";

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
