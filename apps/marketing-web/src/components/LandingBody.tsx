import { MagicWandIcon } from '@radix-ui/react-icons'

import { FeatureHighlights } from '@/components/FeatureHighlights'
import { FeaturePreview } from '@/components/FeaturePreview'

export const LandingBody = () => {
  return (
    <div className="relative flex h-fit flex-col gap-[30px] pt-[40px] md:gap-[80px] md:pt-[60px]">
      <div className="text-primary bg-neutral-100">
        <section className="container py-10">
          {/* <div className="border-0.5 shadow-highlight-hard mb-3 w-fit rounded-full border-purple-400 bg-purple-200 px-3 py-1.5 text-sm text-purple-800">
            <MagicWandIcon className="mr-2 inline-block h-3 w-3" />
            Overview
          </div> */}
          <div className="mb-10 flex flex-col gap-2">
            <span className="font-mono text-xs uppercase text-stone-400">overview</span>
            <h2 className="text-[24px] leading-tight text-stone-950 md:text-3xl md:text-[36px]">
              Fill out any form instantly
            </h2>
            {/* <p className="text-primary/80 mt-2 text-[14px] md:text-[18px]">
              From building your resume to tracking jobs that you&apos;ve applied for, Canyon has
              you covered.
            </p> */}
          </div>

          <FeaturePreview />
        </section>

        <div className="bg-white">
          <section className="container py-10">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase text-stone-400">Features</span>
              <h2 className="text-[24px] leading-tight text-stone-950 md:text-3xl md:text-[36px]">
                <span className="text-primary">Built</span> to enhance your form filling
              </h2>
              {/* <p className="text-primary/80 mt-4"> */}
              {/* From automated receipt-to-transaction mapping to conversing with your
                <br />
                financials and consolidating all your files
              </p> */}
            </div>

            {/* <FeatureHighlights /> */}
          </section>
        </div>
      </div>
    </div>
  )
}
