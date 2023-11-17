'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NextPage } from 'next';
import { useState } from 'react';

export default function NewPage() {
  const [description, setDescription] = useState('');
  const [wagerAmount, setWagerAmount] = useState<number>(0); // in matic
  const [participants, setParticipants] = useState<string[]>([]); // lens handles
  const [judges, setJudges] = useState<string[]>([]); // lens handles
  const [activity, setActivity] = useState<string>(''); // eg. pushups
  const [completionTimeUnit, setCompletionTimeUnit] = useState(''); // eg. hour / day / week / month / year
  const [amountOfActivityPerTimeUnit, setAmountOfActivityPerTimeUnit] =
    useState(0);
  const [duration, setDuration] = useState(0); // in competion time units

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
    <main className='px-10 py-14 max-w-fit mx-auto'>
      <h1 className='text-3xl font-bold'>New Challenge</h1>
      <form className='flex flex-col gap-6 mt-8'>
        <div className='flex flex-col gap-4'>
          <Label>Description</Label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-4'>
          <Label>Wager Amount in matic</Label>
          <Input
            type='number'
            value={wagerAmount}
            onChange={(e) => setWagerAmount(parseInt(e.target.value))}
          />
        </div>

        <div className='flex flex-col gap-4'>
          <Label>Participants - comma separated lens handles</Label>
          <Input
            value={participants.join(',')}
            onChange={(e) => setParticipants(e.target.value.split(','))}
          />
        </div>

        <div className='flex flex-col gap-4'>
          <Label>Judges - comma separated lens handles</Label>
          <Input
            value={judges.join(',')}
            onChange={(e) => setJudges(e.target.value.split(','))}
          />
        </div>

        <div className='flex flex-col gap-4'>
          <Label>Activity</Label>
          <Input
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-4'>
          <Label>Completion Time Unit</Label>
          <Input
            value={completionTimeUnit}
            onChange={(e) => setCompletionTimeUnit(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-4'>
          <Label>Amount of Activity per Time Unit</Label>
          <Input
            type='number'
            value={amountOfActivityPerTimeUnit}
            onChange={(e) =>
              setAmountOfActivityPerTimeUnit(parseInt(e.target.value))
            }
          />
        </div>

        <div className='flex flex-col gap-4'>
          <Label>Duration</Label>
          <Input
            type='number'
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
          />
        </div>

        <Button onClick={onSubmit}>Create</Button>
      </form>
    </main>
  );
}
