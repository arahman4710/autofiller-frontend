'use client'

import { useState } from 'react'

import { CanyonLogoFull } from '@canyon/ui/CanyonLogo'
import { cn } from '@canyon/ui/utils/cn'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { GetStartedButton } from '@/components/GetStartedButton'

const links = [
  {
    mobileOnly: true,
    name: 'home',
    path: '/',
    title: 'Home',
  },
  {
    name: 'advisors',
    path: '/advisors-and-organizations',
    title: 'Advisors and Organizations',
  },
  {
    name: 'pricing',
    path: '/pricing',
    title: 'Pricing',
  },
]

const listVariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
}

const itemVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
}

export function Header() {
  const pathname = usePathname()
  const [isOpen, setOpen] = useState(false)

  const lastPath = `/${pathname.split('/').pop()}`

  const handleToggleMenu = () => {
    setOpen((prev) => {
      document.body.style.overflow = prev ? '' : 'hidden'
      return !prev
    })
  }

  const isAdvisoryPage = pathname.includes('advisors-and-organizations')

  return (
    <header
      className={cn(
        'container sticky top-4 z-50 mt-4 justify-center px-2 md:flex md:px-4',
        pathname === '/' && 'duration-1s animate-header-slide-down-fade transition ease-in-out'
      )}
    >
      <nav className="flex h-[50px] w-full items-center justify-between rounded-lg bg-[#121212] bg-opacity-70 px-4 backdrop-blur-xl backdrop-filter md:bg-transparent">
        <Link className="cursor-pointer" href="/">
          <span className="sr-only">Canyon Logo</span>
          <CanyonLogoFull />
        </Link>

        <ul className="mx-3 hidden space-x-2 text-sm font-medium md:flex">
          {links.map(({ mobileOnly, name, path, title }) => {
            const isActive = path === lastPath

            if (mobileOnly) {
              return null
            }

            return (
              <li key={path}>
                <Link
                  className={cn(
                    'text-secondary-foreground hover:text-text/80 inline-flex h-8 cursor-pointer items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition-colors'
                  )}
                  href={path}
                >
                  {title}
                </Link>
              </li>
            )
          })}
        </ul>

        <button className="ml-auto p-2 md:hidden" onClick={() => handleToggleMenu()} type="button">
          <HamburgerMenuIcon className="h-6 w-6 text-white" />
        </button>

        <div className="hidden w-[240px] items-center justify-end gap-4 text-sm md:flex">
          <Link
            className="hover:text-text/80 px-4 transition-all ease-in-out"
            href="https://app.usecanyon.com/auth/signin"
          >
            Sign In
          </Link>
          {!isAdvisoryPage && <GetStartedButton />}
          {isAdvisoryPage && (
            <GetStartedButton
              className="bg-white text-black hover:bg-white"
              href="https://f3ximpv2jr1.typeform.com/to/BVW0PkNi"
              target="_blank"
              text="Book a Demo"
            />
          )}
        </div>
      </nav>

      {isOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          className="bg-background fixed bottom-0 left-0 right-0 top-0 z-10 m-[1px] h-screen w-screen px-2"
          initial={{ opacity: 0 }}
        >
          <div className="relative mt-4 flex justify-between p-3 px-4">
            <button onClick={handleToggleMenu} type="button">
              <span className="sr-only">Canyon Logo</span>
              <CanyonLogoFull />
            </button>

            <button
              className="absolute right-[10px] top-2 ml-auto p-2 md:hidden"
              onClick={handleToggleMenu}
              type="button"
            >
              <svg
                className="fill-primary"
                height={24}
                width={24}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
              </svg>
            </button>
          </div>

          <div className="h-full overflow-auto">
            <motion.ul
              animate="show"
              className="mb-8 space-y-8 px-3 pt-8 text-xl text-[#878787]"
              initial="hidden"
              variants={listVariant}
            >
              {links.map(({ name, path, title }) => {
                const isActive =
                  path === '/updates' ? pathname.includes('updates') : path === lastPath

                return (
                  <motion.li key={path} variants={itemVariant}>
                    <Link
                      className={cn(isActive && 'text-white')}
                      href={path}
                      onClick={handleToggleMenu}
                    >
                      {title}
                    </Link>
                  </motion.li>
                )
              })}

              <motion.li className="w-fit" variants={itemVariant}>
                <GetStartedButton className="text-primary bg-white text-xl" />
              </motion.li>

              <motion.li
                className="border-border-secondary mt-auto border-t-[1px] pt-8"
                variants={itemVariant}
              >
                <Link
                  className="text-muted-foreground text-xl"
                  href="https://app.usecanyon.com/auth/signin"
                >
                  Sign in
                </Link>
              </motion.li>
            </motion.ul>
          </div>
        </motion.div>
      )}
    </header>
  )
}
