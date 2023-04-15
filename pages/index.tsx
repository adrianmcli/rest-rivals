import Image from "next/image";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <main className="min-h-screen px-12">
      <header className="py-4 flex items-center justify-between">
        <span className="text-4xl font-semibold">RestRivals</span>
        <ConnectButton />
      </header>
    </main>
  );
}
