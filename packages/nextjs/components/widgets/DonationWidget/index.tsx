"use client";

import Image from "next/image";
import DonationForm from "./DonationForm";

export default function DonationWidget({
  profile,
}: {
  profile: {
    username: string;
    profilePictureURL: string;
    minDonationUSD: bigint;
  };
}) {
  return (
    <div className="bg-secondary w-full duration-300 p-5 rounded-md flex flex-col gap-3 items-center">
      <div className="flex flex-row gap-3 w-full justify-center items-center">
        <div className="text-xl lg:text-3xl flex items-center gap-2 whitespace-nowrap">
          Donate to <span className="text-xl lg:text-4xl font-bold">{profile.username}</span>
        </div>
        <div className="avatar">
          <div className="rounded-md md:w-[50px] md:h-[50px] w-[25px] h-[25px]">
            <Image src={profile.profilePictureURL} width={50} height={50} alt="profile image" />
          </div>
        </div>
      </div>
      <DonationForm username={profile.username} minDonationUSD={Number(profile.minDonationUSD)} />
    </div>
  );
}
