import DonationWidget from "~~/components/widgets/DonationWidget";

export default function CreatorPage({ params }: { params: { username: string } }) {
  return (
    <div className="h-page flex flex-col py-10 items-center w-full">
      <div className="bg-secondary w-1/2 p-5 rounded-md flex justify-center">
        <DonationWidget username={params.username} />
      </div>
    </div>
  );
}
