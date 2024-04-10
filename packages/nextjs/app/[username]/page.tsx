export default function CreatorPage({ params }: { params: { username: string } }) {
  return <div>Profile of: {params.username}</div>;
}
