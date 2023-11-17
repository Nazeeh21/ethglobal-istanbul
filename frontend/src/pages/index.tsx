import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {isConnected ? (
        <Button variant='outline' onClick={() => open()}>
          Disconnect
        </Button>
      ) : (
        <Button onClick={() => open()}>Connect</Button>
      )}
    </main>
  );
}
