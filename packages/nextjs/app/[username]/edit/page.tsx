"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import copy from "copy-to-clipboard";
import { ColorResult, SketchPicker } from "react-color";
import { AppRoutes } from "~~/components/Header";
import { useIsProfileOwner } from "~~/components/hooks/useIsProfileOwner";
import { CopyIcon, LeftArrowIcon } from "~~/components/ui/Icons";
import DonationAlert from "~~/components/widgets/DonationAlert";
import { notification } from "~~/utils/scaffold-eth";

export default function CreatorEditPage({ params }: { params: { username: string } }) {
  const baseUrl = window.location.origin;
  const donationLink = `${baseUrl}/${params.username}${AppRoutes.USER_DONATE}`;
  const isProfileOwner = useIsProfileOwner(params.username);
  const [usdMode, setUsdMode] = useState<string>("false");
  const [color, setColor] = useState<ColorResult["hex"]>("#000000");
  const link = useMemo<string>(
    () => `${baseUrl}/${params.username}${AppRoutes.USER_WIDGET}?usdMode=${usdMode}&color=${encodeURIComponent(color)}`,
    [baseUrl, params.username, usdMode, color],
  );

  const handleCopyLink = (isDonationLink?: boolean) => {
    const isCopied = copy(isDonationLink ? donationLink : link, {
      debug: true,
    });
    if (isCopied) {
      notification.success("Link copied to the clipboard");
    }
  };

  if (isProfileOwner === undefined) return null;
  if (!isProfileOwner)
    return (
      <div className="h-page w-full flex justify-center items-center text-center">
        <span>
          You either don&apos;t have a permission to edit this profile or profile doesn&apos;t exist <br />
          If you&apos;re the owner, please connect your wallet <br />
          <Link href={`${AppRoutes.HOME}${params.username}`} className="underline">
            Go back to creator profile
          </Link>
        </span>
      </div>
    );

  return (
    <div className="min-h-page p-5 flex flex-col gap-5">
      <div className="flex lg:flex-row flex-col justify-center lg:items-stretch items-center gap-5 h-full">
        <div className="relative bg-secondary w-full flex-1 lg:w-1/2 duration-300 p-5 rounded-md flex flex-col gap-3 items-center">
          <Link href={`/${params.username}`} className="absolute top-2 left-0">
            <div className="relative left-2">
              <LeftArrowIcon />
            </div>
          </Link>
          <span className="text-2xl text-center">Customize your Alerts Widget</span>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">ETH mode</span>
              <input
                type="checkbox"
                className="toggle ml-3"
                onChange={e => setUsdMode(e.target.checked ? "true" : "false")}
                checked={usdMode === "true"}
              />
              <span className="label-text ml-3">USD mode</span>
            </label>
          </div>
          <SketchPicker color={color} onChange={color => setColor(color.hex)} />
          <div className="flex flex-col gap-3 items-center mt-10">
            <span className="text-md text-center">
              Your unique alert link is ready. Use it in your streaming tool (ex. OBS)
            </span>
            <div className="relative bg-gray-400/20 pl-3 pr-10 py-2 rounded-md w-full text-center">
              <span>{link}</span>
              <div
                className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
                onClick={() => handleCopyLink()}
              >
                <CopyIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-secondary w-full flex-1 lg:w-1/2 duration-300 p-5 rounded-md flex flex-col gap-3 items-center">
          <span className="text-2xl text-center">Widget preview</span>
          <div className="flex flex-col gap-3 justify-center items-center h-full">
            <DonationAlert username={params.username} previewValues={{ color, usdMode }} />
          </div>
        </div>
      </div>
      <div className="bg-secondary w-full p-5 rounded-md flex flex-col gap-3 items-center">
        <span className="text-2xl text-center">
          Share this{" "}
          <Link className="underline underline-offset-4" href={donationLink}>
            donation page
          </Link>{" "}
          with your viewers
        </span>
        <div className="relative bg-gray-400/20 pl-3 pr-10 py-2 rounded-md w-fit text-center">
          <span>{donationLink}</span>
          <div
            className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
            onClick={() => handleCopyLink(true)}
          >
            <CopyIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
