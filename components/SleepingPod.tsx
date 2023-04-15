import { useContractWrite, usePrepareContractWrite } from "wagmi";

interface Pod {
  name: string;
  start: number;
  end: number;
  minScore: number;
  maxSleepers: number;
  stake: number;
}

interface Props {
  pod: Pod;
}

export function SleepingPod({ pod }: Props) {
  const { config, error } = usePrepareContractWrite({
    address: "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
    abi: wagmigotchiABI,
    functionName: "feed",
    // args: []
  });
  const { write } = useContractWrite(config);

  return (
    <div className="bg-slate-700 rounded-lg p-2 w-fit" key={pod.name}>
      <h3 className="text-center text-lg font-bold">{pod.name}</h3>
      <div className="mt-2 bg-slate-800 shadow-inner p-2 rounded shadow-slate-900">
        <div className="flex justify-between items-center gap-4">
          <label>Start date</label>
          <span>{new Date(pod.start * 1000).toLocaleDateString("en-US")}</span>
        </div>
        <div className="flex justify-between items-center gap-4">
          <label>End date</label>
          <span>{new Date(pod.end * 1000).toLocaleDateString("en-US")}</span>
        </div>
        <div className="flex justify-between items-center gap-4">
          <label>Cutoff score</label>
          <span>{pod.minScore}</span>
        </div>
        <div className="flex justify-between items-center gap-4">
          <label>Max sleepers</label>
          <span>{pod.maxSleepers}</span>
        </div>
        <div className="flex justify-between items-center gap-4">
          <label>Stake amount</label>
          <span>USD {pod.stake}</span>
        </div>
      </div>
      <button
        disabled={!write}
        onClick={() => write?.()}
        className="disabled:opacity-70 h-8 bg-blue-500 px-4 rounded-lg w-full mt-2 disabled:hover:cursor-not-allowed enabled:hover:bg-blue-500/70 transition-colors ease-in-out"
      >
        Stake
      </button>
    </div>
  );
}

const wagmigotchiABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "caretaker", type: "address" },
      { indexed: true, internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "CaretakerLoved",
    type: "event",
  },
  { inputs: [], name: "clean", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "feed", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "getAlive",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBoredom",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getHunger",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSleepiness",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStatus",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUncleanliness",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "love",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "play", outputs: [], stateMutability: "nonpayable", type: "function" },
  { inputs: [], name: "sleep", outputs: [], stateMutability: "nonpayable", type: "function" },
];
