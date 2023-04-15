import { Address, useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { ethers } from "ethers";

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

const GAME_ADDRESS = "0xa74BcF8Ea3A1F83EEf0256070fDe58eDe10189F1";

export function SleepingPod({ pod }: Props) {
  const { address } = useAccount();

  const gameContract = {
    address: GAME_ADDRESS as Address,
    abi: gameABI,
  };

  const { config: startConfig } = usePrepareContractWrite({
    address: GAME_ADDRESS,
    abi: gameABI,
    functionName: "startRound",
  });
  const { write: startWrite, isLoading: isLoadingWrite } = useContractWrite(startConfig);

  const { config, error } = usePrepareContractWrite({
    address: GAME_ADDRESS,
    abi: gameABI,
    functionName: "joinGame",
    overrides: {
      from: address,
      value: ethers.utils.parseEther("0.01"),
    },
  });
  const { write, isLoading } = useContractWrite(config);

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
          <span>ETH {pod.stake}</span>
        </div>
      </div>
      <button
        disabled={!write}
        onClick={() => write?.()}
        className="shadow shadow-blue-700 disabled:opacity-70 h-8 bg-blue-500 px-4 rounded-lg w-full mt-2 disabled:hover:cursor-not-allowed enabled:hover:bg-blue-500/70 transition-colors ease-in-out"
      >
        {isLoading ? "Pending" : "Stake"}
      </button>
      {address === "0xa7E455659B20c9E679fe6eF90EcA39eC9Da25C91" && (
        <button
          disabled={!startWrite}
          onClick={() => startWrite?.()}
          className="shadow shadow-blue-700 disabled:opacity-70 h-8 bg-blue-500 px-4 rounded-lg w-full mt-2 disabled:hover:cursor-not-allowed enabled:hover:bg-blue-500/70 transition-colors ease-in-out"
        >
          {isLoading ? "Pending" : "Start round"}
        </button>
      )}
    </div>
  );
}

const gameABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_coordinator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_stakeAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_roundDuration",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "coordinator",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "determineLoserAndRewards",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "minScoreIndex",
        type: "uint256",
      },
    ],
    name: "distributeRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "gameActive",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "joinGame",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "numParticipants",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "participantIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "participants",
    outputs: [
      {
        internalType: "address",
        name: "participantAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "sleepScore",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "submittedScore",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "roundDuration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "roundStartTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stakeAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startNewRound",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startRound",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "participant",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_sleepScore",
        type: "uint256",
      },
    ],
    name: "submitSleepScore",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
