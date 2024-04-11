import DonationAlert from "~~/components/widgets/DonationAlert";

export default function DonationAlertPage({ params }: { params: { username: string } }) {
  return (
    <div className="h-full flex justify-center items-center">
      <DonationAlert username={params.username} />
    </div>
  );
}
