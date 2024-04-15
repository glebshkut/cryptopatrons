"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { etherValueToDisplayValue } from "../scaffold-eth";
import { Log, formatEther } from "viem";
import { useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import { mainContractName } from "~~/lib/contract";
import { useGlobalState } from "~~/services/store/store";
import { DonationAlertValues } from "~~/types/donation";

export default function DonationWidget({ username }: { username: string }) {
  const [recentEvent, setRecentEvent] = useState<Log | null>(null);
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);
  const searchParams = useSearchParams();
  const usdMode = searchParams.get("usdMode");

  const filterDonations = (logs: Log[]) => {
    return logs.filter((log: Log) => (log as any).args.username === username);
  };

  useScaffoldEventSubscriber({
    contractName: mainContractName,
    eventName: "DonationMade",
    listener: (logs: Log[]) => {
      const donations = filterDonations(logs);
      if (donations[0].blockNumber !== recentEvent?.blockNumber) {
        setRecentEvent(donations[0]);
      }
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
    const donationValues: DonationAlertValues = (recentEvent as any).args as DonationAlertValues;
    console.log("🚀 ~ DonationWidget ~ donationValues:", donationValues.amount);
    return (
      <div className="flex flex-col items-center">
        {recentEvent && (
          <>
            <Image src="https://i.giphy.com/duNowzaVje6Di3hnOu.webp" width={504} height={336} alt="alert gif" />
            <span>
              {donationValues.donorName} sent{" "}
              {etherValueToDisplayValue(!!usdMode, formatEther(donationValues.amount).toString(), nativeCurrencyPrice)}{" "}
              {!!usdMode ? "USD" : "ETH"}
            </span>
            <span>{donationValues.message}</span>
          </>
        )}
      </div>
    );
  }

  return null;
}
