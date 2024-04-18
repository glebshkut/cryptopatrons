"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { etherValueToDisplayValue } from "../../scaffold-eth";
import useSound from "use-sound";
import { Log, formatEther } from "viem";
import { useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";
import { mainContractName } from "~~/lib/contract";
import { useGlobalState } from "~~/services/store/store";
import { DonationAlertValues } from "~~/types/donation";

export default function DonationWidget({ username }: { username: string }) {
  const [play, { stop }] = useSound("/alert.mp3", {
    volume: 0.5,
    interrupt: true,
  });
  const [recentEvent, setRecentEvent] = useState<Log | null>(null);
  const [showAlert, setShowAlert] = useState(false);
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
      console.log("🚀 ~ DonationWidget ~ donations:", donations);
      if (donations[0].blockHash !== recentEvent?.blockHash) {
        setShowAlert(true);
        setRecentEvent(donations[0]);
      }
    },
  });

  useEffect(() => {
    if (recentEvent && showAlert) {
      play();
      const timer = setTimeout(() => {
        setShowAlert(false);
        stop();
      }, 7000);
      return () => clearTimeout(timer); // Clean up the timeout
    }
  }, [play, recentEvent, showAlert, stop]);

  if (recentEvent) {
    const donationValues: DonationAlertValues = (recentEvent as any).args as DonationAlertValues;
    return (
      <div className="flex flex-col items-center">
        {recentEvent && showAlert && (
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
