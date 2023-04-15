import LoginBtn from "@/components/login-btn";
import { SleepingPod } from "@/components/SleepingPod";
import { useSleepData } from "@/hooks/useSleepData";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSession } from "next-auth/react";
import { Fragment } from "react";

const PODS = [
  {
    name: "Weekly",
    start: 1681689600,
    end: 1682294400,
    minScore: 50,
    maxSleepers: 7,
    stake: 0.01,
  },
];

export default function Home() {
  const sleepData = useSleepData();
  const { data } = useSession();
  const user = data?.user.email;

  return (
    <main className="min-h-screen px-12">
      <header className="py-4 flex items-center justify-between">
        <span className="text-4xl font-semibold">RestRivals</span>
        <div className="flex gap-3">
          <LoginBtn />
          <ConnectButton />
        </div>
      </header>
      <div className="pointer-events-none flex justify-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]" />
      {user && (
        <p>
          Signed in as: <strong>{user}</strong>
        </p>
      )}
      {sleepData && (
        <p>
          Your average sleep score in the previous 7 days:{" "}
          <strong>
            {(
              sleepData.reduce((acc: number, curr: { score: number }) => acc + curr.score, 0) /
              sleepData.length
            ).toFixed(2)}
          </strong>
        </p>
      )}
      <section className="space-y-2 mt-4">
        <h2 className="text-xl font-bold">Sleeping Pods</h2>
        {PODS.map((pod, i) => (
          <SleepingPod pod={pod} key={i} />
        ))}
      </section>
    </main>
  );
}
