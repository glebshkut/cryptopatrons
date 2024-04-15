import DonationWidget from "~~/components/widgets/DonationWidget";

export default function DonatePage({ params }: { params: { username: string } }) {
  return (
    <div className="h-page flex justify-center items-center">
      <DonationWidget username={params.username} />
    </div>
  );
}
