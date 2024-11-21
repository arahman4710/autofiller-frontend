'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export const AboutHero = () => {
  return (
    <motion.section>
      <div className="container flex w-full flex-col justify-between pb-[64px] md:flex-row">
        <div className="flex max-w-[500px] max-w-[900px] flex-col gap-4">
          <h1 className="hidden text-[28px] font-medium leading-tight md:block md:text-[48px]">
            Mission driven success
          </h1>
          <h1 className="text-[28px] font-medium leading-tight md:hidden">
            Mission driven success
          </h1>

          <div className="mt-2 space-y-4 text-[16px] leading-relaxed text-white/70 md:mt-4 md:mt-6 md:text-[18px]">
            <p>We&apos;re building the next generation of tools for those looking for a job.</p>
          </div>
        </div>
        <div>
          <Image
            alt="Two women looking at a laptop"
            className="animate-header-slide-down-fade mt-[16px] rounded-lg md:mt-0"
            height={325}
            src="/hero-slides/advisors-org-hero.jpg"
            width={325}
          />
        </div>
      </div>
    </motion.section>
  )
}
