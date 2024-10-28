import Link from 'next/link'

import { Logo } from '@/components/Logo'
import { Navigation } from '@/components/Navigation'
import { NavigationAccessories } from '@/components/NavigationAccessories'

export const Sidebar = () => {
  return (
    <div className="hidden min-h-screen flex-col justify-between p-6 sm:w-[240px] md:flex">
      <Link href="/">
        <Logo />
      </Link>
      <div className="mt-6 flex h-full flex-col justify-between">
        <Navigation />
        <NavigationAccessories />
      </div>
    </div>
  )
}
