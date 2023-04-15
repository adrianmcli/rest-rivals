import { ConnectButton } from "@rainbow-me/rainbowkit";
import LoginBtn from "@/components/login-btn";
import { useSleepData } from "@/hooks/useSleepData";
import { Fragment } from "react";

export default function Home() {
  const sleepData = useSleepData();

  return (
    <main className="min-h-screen px-12">
      <header className="py-4 flex items-center justify-between">
        <span className="text-4xl font-semibold">RestRivals</span>
        <div className="flex gap-2">
          <LoginBtn />
          <ConnectButton />
        </div>
      </header>
      <div className="pointer-events-none flex justify-end before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]" />
      {sleepData && (
        <section className="py-10">
          <h2 className="text-xl font-bold">Your sleep data</h2>

          <div className="grid grid-cols-2 w-fit gap-x-4 mt-4">
            <span>Date</span>
            <span className="text-right">Score</span>
            {sleepData.map((day: any, i: number) => (
              <Fragment key={i}>
                <span>{day.summary_date}</span>
                <span className="text-right">{day.score}</span>
              </Fragment>
            ))}
            <hr className="col-span-2" />
            <span>Average</span>
            <span className="text-right">
              {(sleepData.reduce((acc, curr) => acc + curr.score, 0) / sleepData.length).toFixed(2)}
            </span>
          </div>
        </section>
      )}
    </main>
  );
}
