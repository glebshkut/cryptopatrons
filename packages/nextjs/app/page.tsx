"use client";

import Image from "next/image";
import Link from "next/link";
import "./index.css";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import type { NextPage } from "next";
import { AppRoutes } from "~~/components/Header";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { mainContractName } from "~~/lib/contract";

const Home: NextPage = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [AutoScroll({ playOnInit: true })]);

  const { data: profiles, isSuccess: areProfileReady } = useScaffoldContractRead({
    contractName: mainContractName,
    functionName: "getAllProfiles",
  });

  return (
    <div className="h-page flex flex-col justify-center items-center gap-3 relative pt-16">
      <span className="text-4xl">
        Crypto<b>Patrons</b>
      </span>
      <p className="italic text-2xl my-4 text-center">
        Empower your creativity & engage with your audience using crypto
      </p>
      <p className="text-center max-w-md mx-auto my-0">
        Join the unique circle of creators leveraging the power of digital currency. Instant alerts, rapid setup, and
        built on secure blockchain technology
      </p>
      <Link href={AppRoutes.REGISTER} className="btn btn-primary btn-lg text-neutral">
        Create your profile
      </Link>
      {profiles && areProfileReady && (
        <div className="flex flex-col gap-5 mt-10">
          <span className="text-xl text-center">These creators already joined us:</span>
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              {profiles.map((profile: any) => (
                <Link
                  href={`/${profile.username}`}
                  key={profile.username}
                  className="embla__slide flex flex-col items-center justify-between bg-secondary h-full min-h-[140px] min-w-[240px] p-5 rounded-lg"
                >
                  <Image src={profile.profilePictureURL} alt={profile.username} width={100} height={100} />
                  <span>{profile.username}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
