'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreatePost } from '@lens-protocol/react-web'
import { NextPage } from 'next';
import { useState } from 'react';

export default function NewPage() {
  const [description, setDescription] = useState('');
  const [wagerAmount, setWagerAmount] = useState<number>(0); // in matic
  const [participants, setParticipants] = useState<string[]>([]); // lens handles
  const [judges, setJudges] = useState<string[]>([]); // lens handles
  const [activity, setActivity] = useState<string>('push-ups'); // eg. pushups
  const [completionTimeUnit, setCompletionTimeUnit] = useState('day'); // eg. hour / day / week / month / year
  const [amountOfActivityPerTimeUnit, setAmountOfActivityPerTimeUnit] =
    useState(10);
  const [duration, setDuration] = useState(10); // in competion time units
  const { execute } = useCreatePost();

  const onSubmit = async (e) => {
    e.preventDefault();
    // log out the form values

    const challenge = {
      description,
      wagerAmount,
      participants,
      judges,
      activity,
      completionTimeUnit,
      amountOfActivityPerTimeUnit,
      duration,
    };

    console.log(challenge);
  };

  return (
    <main className='px-10 py-14 mx-auto flex flex-col items-center gap-6'>
      <h1 className='text-3xl font-bold'>New Challenge</h1>

      <div className='flex gap-4 items-center justify-center mx-auto mt-4'>
        <span>I want to do</span>
        <Input
          type='number'
          value={amountOfActivityPerTimeUnit}
          onChange={(e) =>
            setAmountOfActivityPerTimeUnit(parseInt(e.target.value))
          }
          className='w-20'
        />
        <Input
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className='w-30'
        />
        <span>every</span>
        <Input
          value={completionTimeUnit}
          onChange={(e) => setCompletionTimeUnit(e.target.value)}
          className='w-20'
        />
      </div>

      <div className='flex gap-4 items-center justify-center mt-4'>
        <span>for</span>
        <Input
          type='number'
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          className='w-20'
        />
        <span>{completionTimeUnit}s</span>
      </div>

      <div className='flex gap-4 items-center justify-center mt-4'>
        <span>Wager</span>
        <Input
          type='number'
          value={wagerAmount}
          onChange={(e) => setWagerAmount(parseInt(e.target.value))}
          className='w-20'
        />
        <span>MATIC</span>
      </div>

      <div className='flex gap-4 items-center justify-center mt-4'>
        <span>Participants</span>
        <Input
          value={participants.join(',')}
          onChange={(e) => setParticipants(e.target.value.split(','))}
          className='w-30'
        />
      </div>

      <div className='flex gap-4 items-center justify-center mt-4'>
        <span>Judges</span>
        <Input
          value={judges.join(',')}
          onChange={(e) => setJudges(e.target.value.split(','))}
          className='w-30'
        />
      </div>

      <Button onClick={onSubmit} className='mt-4 mx-auto'>
        Create Challenge
      </Button>
    </main>
  );
}
