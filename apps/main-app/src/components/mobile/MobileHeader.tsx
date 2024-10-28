import Link from 'next/link'

import { Logo } from '@/components/Logo'

export const MobileHeader = () => {
  return (
    <div className="flex h-[50px] w-full items-center justify-between rounded-lg bg-opacity-70 px-4 backdrop-blur-xl backdrop-filter md:hidden">
      <Link href="/">
        <Logo />
      </Link>
    </div>
  )
}
