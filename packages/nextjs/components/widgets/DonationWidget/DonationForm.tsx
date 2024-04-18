import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { parseEther } from "viem/utils";
import { EtherInput } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { mainContractName } from "~~/lib/contract";
import { DonationValues } from "~~/types/donation";

export default function DonationForm({ username, minDonationUSD }: { username: string; minDonationUSD: number }) {
  const [ethAmount, setEthAmount] = useState("0");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DonationValues>({
    defaultValues: {
      amount: "0",
    },
  });

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: mainContractName,
    functionName: "makeDonation",
    args: [username, watch("donorName"), watch("message")],
    value: parseEther(ethAmount),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const onSubmit: SubmitHandler<DonationValues> = () => writeAsync();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-3">
      <div>
        <div className="label-text">Your name:</div>
        <input
          className="input input-primary w-full rounded-md h-[2.2rem] min-h-[2.2rem] !outline-none"
          {...register("donorName")}
          placeholder="Your name..."
        />
      </div>
      {errors.donorName && <span>This field is required</span>}
      <div>
        <div className="label-text">Your message:</div>
        <textarea
          className="textarea textarea-primary w-full rounded-md !outline-none"
          {...register("message", { required: true })}
          placeholder="Leave a message..."
        />
      </div>
      <div>
        <div className="label-text">Amount {minDonationUSD > 0 && <span> (min {minDonationUSD} USD)</span>}</div>
        <EtherInput value={ethAmount} onChange={value => setEthAmount(value)} />
      </div>
      <button type="submit" className={`btn btn-primary ${isLoading ? "loading" : ""}`}>
        Send
      </button>
    </form>
  );
}
