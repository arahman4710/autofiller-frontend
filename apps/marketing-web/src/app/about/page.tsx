import { Metadata } from 'next'

import { AboutHero } from '@/components/AboutHero'

export const metadata: Metadata = {
  title: 'About',
}

export default function AboutPage() {
  return (
    <div className="min-h-[90dvh] pt-[24px] md:pt-[48px]">
      <AboutHero />
    </div>
  )
}
