"use client";

import Link from "next/link";
import { AppRoutes } from "~~/components/Header";
import { LeftArrowIcon } from "~~/components/ui/Icons";
import DonationWidget from "~~/components/widgets/DonationWidget";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { mainContractName } from "~~/lib/contract";

export default function DonatePage({ params }: { params: { username: string } }) {
  const {
    data: profile,
    isSuccess: isProfileReady,
    isError: noProfile,
  } = useScaffoldContractRead({
    contractName: mainContractName,
    functionName: "getProfile",
    args: [params.username],
  });

  if (isProfileReady && profile) {
    return (
      <div className="h-page flex justify-center items-center">
        <div className="relative w-1/2 flex justify-center">
          <DonationWidget profile={profile} />
          <Link href={`/${params.username}`} className="absolute top-2 left-0">
            <div className="relative right-10">
              <LeftArrowIcon />
            </div>
          </Link>
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
