"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  APECOIN_CONTRACT_ADDRESS,
  FACTORY_CONTRACT_ADDRESS,
} from "@/constants";
import { prepareWriteContract, writeContract } from "@wagmi/core";
import { useState } from "react";
import { Address, useAccount, useContractEvent } from "wagmi";
import FactorContractABI from "../../abi/Factory.json";

export default function NewPage() {
  const { address } = useAccount();
  const [wagerAmount, setWagerAmount] = useState<number>(0); // in matic
  const [participants, setParticipants] = useState<string[]>([]); // address
  const [participantsLensId, setParticipantsLensId] = useState<string[]>([]); // lens handles
  const [judges, setJudges] = useState<string[]>([]); // address handles
  const [judgesLensId, setJudgesLensId] = useState<string[]>([]); // address handles
  const [activity, setActivity] = useState<string>(""); // eg. pushups
  const [completionTimeUnit, setCompletionTimeUnit] = useState(""); // eg. hour / day / week / month / year
  const [amountOfActivityPerTimeUnit, setAmountOfActivityPerTimeUnit] =
    useState(0);
  const [duration, setDuration] = useState(0); // in competion time units
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    // log out the form values
    setLoading(true);

    try {
      const challenge = [
        address,
        wagerAmount,
        // description,
        participants,
        participantsLensId,
        judges,
        judgesLensId,
        activity,
        completionTimeUnit,
        amountOfActivityPerTimeUnit,
        duration,
        APECOIN_CONTRACT_ADDRESS as Address,
      ];
      console.log(challenge);

      const config = await prepareWriteContract({
        address: FACTORY_CONTRACT_ADDRESS,
        abi: FactorContractABI,
        functionName: "createChallengeContract",
        args: challenge,
      });

      const { hash } = await writeContract(config);
      console.log(hash);

      if (hash) {
        await fetch(
          // TODO: change this to the actual backend url
          "https://ethglobal-istanbul-backend-gsf5gk0h1-nazeeh21.vercel.app/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contractAddress: hash,
            }),
          }
        );
        alert("Challenge created successfully");
      }
    } catch (error) {
      console.error("error while creating a challenge: ", error);
      alert("Error while creating a challenge");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-10 py-14 max-w-fit mx-auto">
      <h1 className="text-3xl font-bold">New Challenge</h1>
      <form className="flex flex-col gap-6 mt-8">

        <div className="flex flex-col gap-4">
          <Label>Wager Amount in matic</Label>
          <Input
            type="number"
            value={wagerAmount}
            onChange={(e) => setWagerAmount(parseInt(e.target.value))}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Label>Participants - comma separated addresses</Label>
          <Input
            value={participants.join(",")}
            onChange={(e) => setParticipants(e.target.value.split(","))}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Label>Participants - comma separated lens handles</Label>
          <Input
            value={participantsLensId.join(",")}
            onChange={(e) => setParticipantsLensId(e.target.value.split(","))}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Label>Judges - comma separated addresses</Label>
          <Input
            value={judges.join(",")}
            onChange={(e) => setJudges(e.target.value.split(","))}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Label>Judges - comma separated lens handles</Label>
          <Input
            value={judgesLensId.join(",")}
            onChange={(e) => setJudgesLensId(e.target.value.split(","))}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Label>Activity</Label>
          <Input
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Label>Completion Time Unit</Label>
          <Input
            value={completionTimeUnit}
            onChange={(e) => setCompletionTimeUnit(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <Label>Amount of Activity per Time Unit</Label>
          <Input
            type="number"
            value={amountOfActivityPerTimeUnit}
            onChange={(e) =>
              setAmountOfActivityPerTimeUnit(parseInt(e.target.value))
            }
          />
        </div>

        <div className="flex flex-col gap-4">
          <Label>Duration</Label>
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
          />
        </div>

        {loading ? (
          <div className="text-lg">Loading...</div>
        ) : (
          <Button onClick={onSubmit}>Create</Button>
        )}
      </form>
    </main>
  );
}
