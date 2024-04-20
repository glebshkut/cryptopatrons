"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import lighthouse from "@lighthouse-web3/sdk";
import { SubmitHandler, useForm } from "react-hook-form";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { mainContractName } from "~~/lib/contract";

interface ProfileValues {
  username: string;
  description: string;
  profilePictureURL: string;
  minDonationUSD: string;
}

const progressCallback = (progressData: { total: number; uploaded: number } | undefined) => {
  if (!progressData) return;
  const percentageDone = 100 - progressData.total / progressData.uploaded;
  console.log(percentageDone);
};

export default function CreatorRegister() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<ProfileValues>({
    defaultValues: {
      minDonationUSD: "0",
    },
  });

  const uploadFile = async (file: any) => {
    const output = await lighthouse.upload(
      file.target.files,
      process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY!,
      false,
      undefined,
      progressCallback,
    );
    if (output.data.Hash) {
      setValue("profilePictureURL", `https://gateway.lighthouse.storage/ipfs/${output.data.Hash}`);
    } else {
      setError("profilePictureURL", { type: "manual", message: "Error uploading file" });
    }
  };

  const { writeAsync, isLoading, isSuccess } = useScaffoldContractWrite({
    contractName: mainContractName,
    functionName: "createProfile",
    args: [watch("username"), watch("description"), watch("profilePictureURL"), BigInt(watch("minDonationUSD"))],
    blockConfirmations: 3,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const onSubmit: SubmitHandler<ProfileValues> = () => {
    if (errors.username || errors.description || errors.profilePictureURL || errors.minDonationUSD) return;
    writeAsync();
  };

  useEffect(() => {
    if (isSuccess) {
      router.push(`/${watch("username")}`);
    }
  }, [isSuccess, router, watch]);

  return (
    <div className="flex flex-col items-center p-5 md:px-32 gap-3">
      <span className="text-2xl">Creator Registration form</span>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-3">
        <div>
          <div className="label-text">Your name:</div>
          <input
            className="input input-primary w-full rounded-md h-[2.2rem] min-h-[2.2rem] !outline-none"
            {...register("username", { required: true })}
            placeholder="Your username..."
          />
          {errors.username && <span className="text-red-600 text-sm">This field is required</span>}
        </div>
        <div>
          <div className="label-text">Description:</div>
          <textarea
            className="textarea textarea-primary w-full rounded-md !outline-none"
            {...register("description", { required: true })}
            placeholder="Description..."
          />
          {errors.description && <span className="text-red-600 text-sm">This field is required</span>}
        </div>
        <div>
          <div className="label-text">Minimum Donation (USD):</div>
          <input
            type="number"
            className="input input-primary w-full rounded-md h-[2.2rem] min-h-[2.2rem] !outline-none"
            {...register("minDonationUSD", { required: true })}
            placeholder="Minimum Donation (USD)..."
          />
          {errors.minDonationUSD && <span className="text-red-600 text-sm">This field is required</span>}
        </div>
        <div>
          <div className="label-text">Profile Picture URL:</div>
          <input
            type="file"
            className="file-input file-input-bordered file-input-md my-2 file-input-secondary w-full max-w-sm"
            accept="image/jpeg, image/png"
            onChange={uploadFile}
          />
          {errors.profilePictureURL && <span className="text-red-600 text-sm">This field is required</span>}
        </div>
        <button type="submit" className={`btn btn-primary ${isLoading ? "loading" : ""}`}>
          Create a profile
        </button>
      </form>
    </div>
  );
}
