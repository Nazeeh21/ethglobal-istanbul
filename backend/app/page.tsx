"use client"
// Imports
// ========================================================
import { LensClient, production } from "@lens-protocol/client";
import { useEffect, useRef, useState } from "react";
import { createWalletClient, custom } from "viem";
import { goerli } from "viem/chains";

// Configuration
// ========================================================
const lensClient = new LensClient({
  environment: production,
});
// const account = privateKeyToAccount(`${process.env.WALLET_PRIVATE_KEY}` as `0x${string}`);


// Main Page
// ========================================================
const Home = async () => {
  // const [walletClient, setWalletClient] = useState<any>(null);
  const walletClient = useRef<any>(null);

    
  const doSomething = async () => {
  };

  useEffect(() => {
    const init = async () => {
      const walletClient = await createWalletClient({
        chain: goerli,
        transport: custom((window as any).ethereum)
    });
    };

    init();
    // setWalletClient();
  }, []);

  // Return
  return <div>
    <h1>Hello</h1>
    <button onClick={doSomething}>Connect</button>
    <pre></pre>
  </div>
};

// Exports
// ========================================================
export default Home;
