"use client"

import { GlobalContext } from '@/context';
import { useContext } from 'react';

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='text-2xl font-bold font-mono'>
        Welcome to my website eccomerce
      </h1>
    </main>
  )
}
