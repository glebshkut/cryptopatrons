"use client";

import Image from "next/image";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { mainContractName } from "~~/lib/contract";

export default function DonationWidget({ username }: { username: string }) {
  const { data: profile, isSuccess: isProfileReady } = useScaffoldContractRead({
    contractName: mainContractName,
    functionName: "getProfile",
    args: [username],
  });
  return isProfileReady && profile ? (
    <div className="flex flex-col">
      <div className="flex flex-row items-center">
        <Image src={profile.profilePictureURL} width={100} height={100} className="rounded-full" alt="profile image" />
        <span>{profile?.username}</span>
      </div>
      <span>{profile.name}</span>
    </div>
  ) : (
    <div>loading...</div>
  );
}
