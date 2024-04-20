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

export default function DonationAlert({
  username,
  previewValues,
}: {
  username: string;
  previewValues?: { usdMode: string; color: string | null };
}) {
  const [play, { stop }] = useSound("/alert.mp3", {
    volume: 0.5,
    interrupt: true,
  });
  const [recentEvent, setRecentEvent] = useState<Log | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);
  const searchParams = useSearchParams();
  const usdMode = searchParams.get("usdMode");
  const color = searchParams.get("color");

  const filterDonations = (logs: Log[]) => {
    return logs.filter((log: Log) => (log as any).args.username === username);
  };

  useScaffoldEventSubscriber({
    contractName: mainContractName,
    eventName: "DonationMade",
    listener: (logs: Log[]) => {
      const donations = filterDonations(logs);
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
      return () => clearTimeout(timer);
    }
  }, [play, recentEvent, showAlert, stop]);

  const renderAlert = (donationValues: DonationAlertValues, usdMode: string | null, color: string | null) => {
    return (
      <>
        <Image src="https://i.giphy.com/duNowzaVje6Di3hnOu.webp" width={504} height={336} alt="alert gif" />
        <span style={{ color: color ? color : undefined }}>
          {donationValues.donorName} sent{" "}
          {etherValueToDisplayValue(
            usdMode !== "false",
            formatEther(donationValues.amount).toString().substring(0, 6),
            nativeCurrencyPrice,
          )}{" "}
          {usdMode !== "false" ? "USD" : "ETH"}
        </span>
        <span style={{ color: color ? color : undefined }}>{donationValues.message}</span>
      </>
    );
  };

  if (previewValues) {
    return renderAlert(
      {
        donorName: "John Doe",
        amount: BigInt(1000000000000000000),
        message: "This is a test donation",
      },
      previewValues.usdMode,
      previewValues.color,
    );
  }

  if (recentEvent) {
    const donationValues: DonationAlertValues = (recentEvent as any).args as DonationAlertValues;
    return (
      <div className="flex flex-col items-center">
        {recentEvent && showAlert && renderAlert(donationValues, usdMode, color)}
      </div>
    );
  }

  return null;
}
