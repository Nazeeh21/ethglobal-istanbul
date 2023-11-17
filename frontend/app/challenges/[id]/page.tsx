export default function ChallengePage({ params }: { params: { id: string } }) {
  return (
    <main className='px-10 py-14 max-w-fit mx-auto'>
      <h1 className='text-3xl font-bold'>Challenge {params.id} </h1>
    </main>
  );
}
