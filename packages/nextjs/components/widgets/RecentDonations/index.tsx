"use client";

import { formatEther } from "viem";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { mainContractName } from "~~/lib/contract";

export interface Donation {
  donorName: string;
  amount: bigint;
  message: string;
  timestamp: bigint;
}

export default function RecentDonations({ username }: { username: string }) {
  const {
    data: donations,
    isSuccess: areDonationsReady,
    isFetching,
  } = useScaffoldContractRead({
    contractName: mainContractName,
    functionName: "getAllDonations",
    args: [username],
  });

  if (isFetching) {
    return <div>fetching recent donations from blockchain...</div>;
  }
  return (
    <div className="flex flex-col gap-3 w-full mx-auto items-center">
      <div className="text-3xl">
        {(!areDonationsReady || !donations || donations.length < 1) && "No"} Recent Donations
      </div>
      {areDonationsReady && donations && donations.length > 0 && (
        <div className="flex flex-col-reverse items-center w-full gap-3 mt-5">
          {donations.map((donation: Donation, index: number) => {
            const stringAmount = formatEther(donation.amount).toString();
            const amount = stringAmount.length > 8 ? stringAmount.substring(0, 6) : stringAmount;
            return (
              <div key={index} className="flex flex-row gap-3 w-full bg-info p-4 rounded-md">
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex flex-row justify-between gap-2 w-full">
                    <div className="font-medium">{donation.donorName}</div>
                    <div>{amount} ETH</div>
                  </div>
                  <div className="text-center whitespace-break-spaces">{donation.message}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
