"use client";

import lighthouse from "@lighthouse-web3/sdk";

export default function CreatorRegister() {
  const progressCallback = (progressData: { total: number; uploaded: number } | undefined) => {
    if (!progressData) return;
    const percentageDone = 100 - progressData.total / progressData.uploaded;
    console.log(percentageDone);
  };

  const uploadFile = async (file: any) => {
    const output = await lighthouse.upload(
      file,
      process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY!,
      false,
      undefined,
      progressCallback,
    );
    console.log("File Status:", output);
    /*
      output:
        data: {
          Name: "filename.txt",
          Size: 88000,
          Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
        }
      Note: Hash in response is CID.
    */

    console.log("Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash);
  };

  return (
    <div>
      <span>Register Creator</span>
      <input type="file" accept="image/jpeg, image/png" onChange={uploadFile} />
    </div>
  );
}
