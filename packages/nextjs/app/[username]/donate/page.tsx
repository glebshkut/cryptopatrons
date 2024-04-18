"use client";

import DonationWidget from "~~/components/widgets/DonationWidget";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { mainContractName } from "~~/lib/contract";

export default function DonatePage({ params }: { params: { username: string } }) {
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
    <div className="h-page flex justify-center items-center">
      <div className="w-1/2 flex justify-center">
        <DonationWidget profile={profile} />
      </div>
    </div>
  );
}
