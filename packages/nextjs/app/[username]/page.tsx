"use client";

import DonationWidget from "~~/components/widgets/DonationWidget";
import RecentDonations from "~~/components/widgets/RecentDonations";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { mainContractName } from "~~/lib/contract";

export default function CreatorPage({ params }: { params: { username: string } }) {
  const {
    data: profile,
    isSuccess: isProfileReady,
    isFetching: isFetchinProfile,
  } = useScaffoldContractRead({
    contractName: mainContractName,
    functionName: "getProfile",
    args: [params.username],
  });

  if (isFetchinProfile) {
    return <div>fetching profile...</div>;
  }

  if (!isProfileReady || !profile) {
    return <div>profile not found</div>;
  }

  return (
    <div className="min-h-page flex flex-col p-10 gap-5 items-center w-full">
      <div className="bg-secondary w-full flex flex-row gap-5 lg:w-1/2 duration-300 p-5 rounded-md">
        <img src={profile.profilePictureURL} alt="profile picture" className="rounded-md" width={100} />
        <div className="flex flex-col">
          <div className="text-3xl font-bold">{profile.username}</div>
          <div className="text-xl font-medium">{profile.description}</div>
        </div>
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
