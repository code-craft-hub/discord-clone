import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

export const initialProfile = async () => {
  const user = await currentUser();

  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const profile = await db.profile.findUnique({
    where: {
      userId: userId,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: userId,
      name: `${user?.firstName} ${user?.lastName}`,
      imageUrl: user?.imageUrl ?? "",
      email: user?.emailAddresses[0].emailAddress ?? "",
    },
  });

  return newProfile;
};
