'use client'

import { GetStartedButton } from './GetStartedButton'

export const GetStartedCTA = () => {
  return (
    <div className="w-full bg-white pb-24">
      <div className="container mx-auto flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <h2 className="hidden text-3xl font-semibold leading-snug text-stone-900 md:block">
          <span className="text-black/60">Ready to start?</span>
          <br />
          Try Canyon for free today.
        </h2>

        <h2 className="text-3xl font-semibold leading-snug text-stone-900 md:hidden">
          <span className="text-black/60">Ready to start?</span>
          <br />
          Try Canyon for free.
        </h2>

        <GetStartedButton className="bg-black text-white hover:bg-black/90" />
      </div>
    </div>
  )
}
