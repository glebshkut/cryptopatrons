import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { mainContractName } from "~~/lib/contract";

export const useIsProfileOwner = (username: string) => {
  const { address } = useAccount();

  const { data: ownerAddress } = useScaffoldContractRead({
    contractName: mainContractName,
    functionName: "getProfileOwner",
    args: [username],
  });

  if (!ownerAddress || !address) return undefined;
  return ownerAddress.toLowerCase() === address.toLowerCase();
};
