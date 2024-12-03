'use client'
import { useEffect, useState } from 'react'

import { CheckCircledIcon, DotFilledIcon } from '@radix-ui/react-icons'
import { LogoFull } from '@rag/ui/Logo'
import { cn } from '@rag/ui/utils/cn'
import Link from 'next/link'

export const Footer = () => {
  const [hasDegredations, setHasDegredations] = useState(false)

  const bottomLinks = [
    {
      href: '/terms-of-service',
      label: 'Terms of Service',
    },
    {
      href: '/privacy-policy',
      label: 'Privacy Policy',
    },
  ]

  const siteMap = [
    // {
    //   links: [
    //     {
    //       href: '/features',
    //       label: 'Features',
    //     },
    //     {
    //       href: '/pricing',
    //       label: 'Pricing',
    //     },
    //     {
    //       href: '/advisors-and-organizations',
    //       label: 'Advisors & Organizations',
    //     },
    //     {
    //       href: 'https://chrome.google.com/webstore/detail/npekhmlmillbfcbohangleomoblkckih?authuser=0&hl=en',
    //       label: 'Browser Extension',
    //     },
    //   ],
    //   title: 'Product',
    // },
    {
      links: [
        // { href: '/about', label: 'About' },
        // {
        //   href: '/career-center',
        //   label: 'Blog',
        // },
        {
          href: 'mailto:support@skugrep.xyz',
          label: 'Contact Us',
        },
      ],
      title: 'Company',
    },
  ]

  useEffect(() => {
    // const checkOperationaStatus = async () => {
    //   try {
    //     const response = await fetch('/api/checkly')
    //     const data = await response.json()

    //     if (data.hasDegredations) {
    //       setHasDegredations(true)
    //     }
    //   } catch (error) {}
    // }

    // checkOperationaStatus()
  }, [])

  return (
    <footer className="container rounded-lg py-[40px] text-sm">
      <div className="flex flex-col items-start justify-between pb-8 md:flex-row">
        <div className="flex flex-col">
          <LogoFull />
        </div>

        <div className="mt-5 flex items-start gap-10 pr-4 md:mt-0">
          {siteMap.map((section) => (
            <div className="space-y-3" key={section.title}>
              <label className="text-stone-200">{section.title}</label>
              <div className="text-muted-foreground flex flex-col gap-3">
                {section.links.map((link) => (
                  <Link className="hover:text-stone-200" href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t-0.5 border-border-secondary pt-6">
        <div className="text-muted-foreground flex flex flex-col flex-col justify-between gap-4 md:flex-row md:flex-row">
          <div className="flex items-center gap-3">
            {bottomLinks.map((link) => (
              <Link className="hover:text-stone-200" href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center md:justify-start">
            <p
              className="hidden cursor-pointer items-center gap-1 md:flex"
            >
              <DotFilledIcon
                className={cn('h-4 w-4', hasDegredations ? 'text-amber-400' : 'text-green-400')}
              />
              {hasDegredations ? 'Systems Degraded' : 'Systems Operational'}
            </p>
            <span>© 2024 PageTracker</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
