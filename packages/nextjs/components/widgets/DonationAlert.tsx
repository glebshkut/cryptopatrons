"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Log, formatEther } from "viem";
import { useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import { mainContractName } from "~~/lib/contract";
import { DonationValues } from "~~/types/donation";

export default function DonationWidget({ username }: { username: string }) {
  const [recentEvent, setRecentEvent] = useState<Log | null>(null);

  const filterDonations = (logs: Log[]) => {
    return logs.filter((log: Log) => (log as any).args.username === username);
  };

  useScaffoldEventSubscriber({
    contractName: mainContractName,
    eventName: "DonationMade",
    listener: (logs: Log[]) => {
      console.log("DonationMade", logs);
      const donations = filterDonations(logs);
      if (donations[0].blockNumber !== recentEvent?.blockNumber) {
        setRecentEvent(donations[0]);
      }
      console.log("🚀 ~ DonationWidget ~ donations:", donations);
    },
  });

  useEffect(() => {
    if (recentEvent) {
      const timer = setTimeout(() => {
        setRecentEvent(null); // Hide the event after 5 seconds
      }, 5000);
      return () => clearTimeout(timer); // Clean up the timeout
    }
  }, [recentEvent]);

  if (recentEvent) {
    const donationValues: DonationValues = (recentEvent as any).args as DonationValues;
    return (
      <div className="flex flex-col items-center">
        {recentEvent && (
          <>
            <Image src="https://i.giphy.com/duNowzaVje6Di3hnOu.webp" width={504} height={336} alt="alert gif" />
            <span>
              {donationValues.donorName} donated {formatEther(donationValues.amount as unknown as bigint)} ETH
            </span>
            <span>{donationValues.message}</span>
          </>
        )}
      </div>
    );
  }

  return null;
}
