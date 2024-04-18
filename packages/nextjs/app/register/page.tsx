"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import lighthouse from "@lighthouse-web3/sdk";
import { SubmitHandler, useForm } from "react-hook-form";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { mainContractName } from "~~/lib/contract";

interface ProfileValues {
  username: string;
  name: string;
  description: string;
  profilePictureURL: string;
  minDonationUSD: string;
}

export default function CreatorRegister() {
  // const progressCallback = (progressData: { total: number; uploaded: number } | undefined) => {
  //   if (!progressData) return;
  //   const percentageDone = 100 - progressData.total / progressData.uploaded;
  //   console.log(percentageDone);
  // };

  // const uploadFile = async (file: any) => {
  //   const output = await lighthouse.upload(
  //     file,
  //     process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY!,
  //     false,
  //     undefined,
  //     progressCallback,
  //   );
  //   console.log("File Status:", output);
  //   /*
  //     output:
  //       data: {
  //         Name: "filename.txt",
  //         Size: 88000,
  //         Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
  //       }
  //     Note: Hash in response is CID.
  //   */

  //   console.log("Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash);
  // };
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileValues>({
    defaultValues: {
      minDonationUSD: "0",
    },
  });

  const { writeAsync, isLoading, isSuccess } = useScaffoldContractWrite({
    contractName: mainContractName,
    functionName: "createProfile",
    args: [
      watch("username"),
      watch("name"),
      watch("description"),
      watch("profilePictureURL"),
      BigInt(watch("minDonationUSD")),
    ],
    blockConfirmations: 3,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const onSubmit: SubmitHandler<ProfileValues> = () => writeAsync();

  useEffect(() => {
    if (isSuccess) {
      router.push(`/${watch("username")}`);
    }
  }, [isSuccess, router, watch]);

  return (
    <div className="flex flex-col items-center px-5 pt-5 gap-3">
      <span className="text-2xl">Creator Registration form</span>
      {/* <input type="file" accept="image/jpeg, image/png" onChange={uploadFile} /> */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-3">
        <div>
          <div className="label-text">Your name:</div>
          <input
            className="input input-primary w-full rounded-md h-[2.2rem] min-h-[2.2rem] !outline-none"
            {...register("username", { required: true })}
            placeholder="Your name..."
          />
          {errors.username && <span>This field is required</span>}
        </div>
        <div>
          <div className="label-text">Name:</div>
          <input
            className="input input-primary w-full rounded-md h-[2.2rem] min-h-[2.2rem] !outline-none"
            {...register("name", { required: true })}
            placeholder="Name..."
          />
          {errors.name && <span>This field is required</span>}
        </div>
        <div>
          <div className="label-text">Description:</div>
          <textarea
            className="textarea textarea-primary w-full rounded-md !outline-none"
            {...register("description", { required: true })}
            placeholder="Description..."
          />
          {errors.description && <span>This field is required</span>}
        </div>
        <div>
          <div className="label-text">Profile Picture URL:</div>
          <input
            className="input input-primary w-full rounded-md h-[2.2rem] min-h-[2.2rem] !outline-none"
            {...register("profilePictureURL", { required: true })}
            placeholder="Profile Picture URL..."
          />
          {errors.profilePictureURL && <span>This field is required</span>}
        </div>
        <div>
          <div className="label-text">Minimum Donation (USD):</div>
          <input
            type="number"
            className="input input-primary w-full rounded-md h-[2.2rem] min-h-[2.2rem] !outline-none"
            {...register("minDonationUSD", { required: true })}
            placeholder="Minimum Donation (USD)..."
          />
          {errors.minDonationUSD && <span>This field is required</span>}
        </div>
        <button type="submit" className={`btn btn-primary ${isLoading ? "loading" : ""}`}>
          Create a profile
        </button>
      </form>
    </div>
  );
}
