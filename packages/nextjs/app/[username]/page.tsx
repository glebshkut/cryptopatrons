"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppRoutes } from "~~/components/Header";
import { useIsProfileOwner } from "~~/components/hooks/useIsProfileOwner";
import { SettingsIcon } from "~~/components/ui/Icons";
import DonationWidget from "~~/components/widgets/DonationWidget";
import RecentDonations from "~~/components/widgets/RecentDonations";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { mainContractName } from "~~/lib/contract";

export default function CreatorPage({ params }: { params: { username: string } }) {
  const {
    data: creatorProfile,
    isSuccess: isProfileReady,
    isError: noProfile,
  } = useScaffoldContractRead({
    contractName: mainContractName,
    functionName: "getProfile",
    args: [params.username],
  });
  const isProfileOwner = useIsProfileOwner(params.username);
  const profile = useMemo(() => creatorProfile, [creatorProfile]);

  if (profile && isProfileReady) {
    return (
      <div className="min-h-page flex flex-col p-10 gap-5 items-center w-full">
        <div className="relative bg-secondary w-full flex flex-row gap-5 lg:w-1/2 duration-300 p-5 rounded-md">
          <Image
            src={profile.profilePictureURL}
            alt="profile picture"
            className="rounded-md"
            width={150}
            height={150}
          />
          <div className="flex flex-col">
            <div className="text-3xl font-bold">{profile.username}</div>
            <div className="text-xl font-medium">{profile.description}</div>
          </div>
          {isProfileOwner && (
            <Link href={`${params.username}${AppRoutes.USER_EDIT}`} className="absolute top-2 right-2">
              <SettingsIcon />
            </Link>
          )}
        </div>
        <div className="bg-secondary w-full lg:w-1/2 duration-300 p-5 rounded-md flex justify-center">
          <DonationWidget profile={profile} />
        </div>
        <div className="bg-secondary w-full lg:w-1/2 duration-300 p-5 rounded-md flex justify-center">
          <RecentDonations username={params.username} />
        </div>
      </div>
    );
  }

  if (noProfile) {
    return (
      <div className="h-page w-full flex justify-center items-center">
        <span>
          Creator not found.{" "}
          <Link href={AppRoutes.HOME} className="underline">
            Go back to home
          </Link>
        </span>
      </div>
    );
  }
}
