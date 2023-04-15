import Image from "next/image";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <main className="min-h-screen px-12">
      <header className="py-4 flex items-center justify-between">
        <span className="text-4xl font-semibold">RestRivals</span>
        <ConnectButton />
      </header>
      <div className="pointer-events-none flex justify-end before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]" />
      <div className="space-y-2">
        <p>Connect your Oura account to see your sleep data.</p>
        <button
          onClick={() => null}
          className="rounded h-10 px-4 bg-blue-500 font-medium hover:bg-blue-500/70 transition-colors ease-in-out"
        >
          Sign-in with Oura
        </button>
      </div>
    </main>
  );
}
