import { SubmitHandler, useForm } from "react-hook-form";
import { parseEther } from "viem/utils";
import { EtherInput } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { mainContractName } from "~~/lib/contract";
import { DonationValues } from "~~/types/donation";

export default function DonationForm({ username }: { username: string }) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<DonationValues>({
    defaultValues: {
      amount: "0",
    },
  });

  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: mainContractName,
    functionName: "makeDonation",
    args: [username, getValues("donorName"), getValues("message")],
    value: parseEther(getValues("amount")),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const onSubmit: SubmitHandler<DonationValues> = () => writeAsync();

  console.log("🚀 ~ DonationForm ~ isMining:", isMining);
  console.log("🚀 ~ DonationForm ~ isLoading:", isLoading);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <input {...register("donorName")} />
      {errors.donorName && <span>This field is required</span>}
      <input {...register("message", { required: true })} />
      <EtherInput value={getValues("amount")} onChange={value => setValue("amount", value)} />
      <button type="submit" className={`btn btn-primary ${isLoading ? "loading" : ""}`}>
        Send
      </button>
    </form>
  );
}
