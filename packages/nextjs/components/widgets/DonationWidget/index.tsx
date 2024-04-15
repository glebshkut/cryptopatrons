"use client";

import Image from "next/image";
import DonationForm from "./DonationForm";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { mainContractName } from "~~/lib/contract";

export default function DonationWidget({ username }: { username: string }) {
  const { data: profile, isSuccess: isProfileReady } = useScaffoldContractRead({
    contractName: mainContractName,
    functionName: "getProfile",
    args: [username],
  });

  return isProfileReady && profile ? (
    <div className="flex flex-col gap-3 items-center w-full">
      <div className="flex flex-row gap-3 w-full justify-center items-center">
        <div className="text-3xl flex items-center gap-2">
          Donate to <span className="text-4xl font-bold">{profile.username}</span>
        </div>
        <div className="avatar">
          <div className="rounded-md">
            <Image src={profile.profilePictureURL} width={50} height={50} alt="profile image" />
          </div>
        </div>
      </div>
      <DonationForm username={username} />
    </div>
  ) : (
    <div>loading...</div>
  );
}
