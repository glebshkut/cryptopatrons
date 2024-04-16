"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { AppRoutes } from "~~/components/Header";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { mainContractName } from "~~/lib/contract";

const Home: NextPage = () => {
  const { data: profiles, isSuccess: areProfileReady } = useScaffoldContractRead({
    contractName: mainContractName,
    functionName: "getAllProfiles",
  });
  console.log("🚀 ~ profiles:", profiles);
  return (
    <div className="h-page flex flex-col justify-center items-center gap-3">
      <span className="text-3xl">
        Crypto<b>Patrons</b>
      </span>
      <span>Receive crypto donations & engage with your audience with ease</span>
      <Link href={AppRoutes.REGISTER} className="btn btn-primary">
        Create your profile
      </Link>
      {profiles && areProfileReady && (
        <div>
          {profiles.map((profile: any) => (
            <div key={profile.username}>
              <Link href={`/${profile.username}`}>{profile.username}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
