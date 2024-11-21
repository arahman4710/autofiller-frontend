'use client'

import { Badge } from '@canyon/ui/Badge'
import { MagicWandIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { GetStartedButton } from '@/components/GetStartedButton'

export const AdvisorAndOrgHero = () => {
  return (
    <motion.section>
      <div className="container flex w-full flex-col justify-between pb-[64px] md:flex-row">
        <div className="flex max-w-[720px] flex-col gap-4">
          <div className="border-0.5 shadow-highlight-hard mb-2 w-fit rounded-full border-purple-400 bg-purple-500/50 px-3 py-1 text-sm text-purple-100">
            <MagicWandIcon className="mr-2 inline-block h-3 w-3" />
            Just Launched
          </div>
          {/* <Badge className="w-fit" variant="discount">
            <MagicWandIcon className="mr-2 inline-block h-3 w-3" />
            Now Launching!
          </Badge> */}
          <h1 className="hidden text-[48px] font-medium leading-tight md:block">
            Your partner in turning career dreams into reality
          </h1>
          <h1 className="text-[28px] font-medium leading-tight md:hidden">
            Your partner in turning career dreams into reality
          </h1>

          <div className="mt-2 space-y-4 text-[16px] leading-relaxed text-white/70 md:mt-4 md:text-[18px]">
            <p>
              We equip career advisors with powerful tools that help transform client aspirations
              into measurable success stories.
            </p>
          </div>
          <GetStartedButton
            className="my-[16px] w-fit rounded-full bg-amber-200 px-4 text-black hover:bg-amber-300 md:my-[32px] "
            href="https://f3ximpv2jr1.typeform.com/to/BVW0PkNi"
            target="_blank"
            text="Book a Demo"
          />
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
