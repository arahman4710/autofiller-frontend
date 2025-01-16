'use client'

import { Carousel, CarouselContent, CarouselItem } from '@autofiller/ui/Carousel'
import Autoscroll from 'embla-carousel-auto-scroll'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { GetStartedButton } from '@/components/GetStartedButton'

export const Hero = () => {
  const carouselSlides: { height: number; src: string; title: string; width: number }[] = [
    // {
    //   height: 294,
    //   src: '/hero-slides/ipad-woman.jpg',
    //   title: 'Woman looking at iPad',
    //   width: 450,
    // },
    // {
    //   height: 294,
    //   src: '/hero-slides/enhance-achievement-slide.png',
    //   title: 'Enhance Achievements',
    //   width: 400,
    // },
    // {
    //   height: 100,
    //   src: '/hero-slides/shauna-relaxed.jpg',
    //   title: 'Woman relaxed',
    //   width: 300,
    // },
    // {
    //   height: 294,
    //   src: '/hero-slides/applications-slide.png',
    //   title: 'Job Applications',
    //   width: 330,
    // },
    // {
    //   height: 294,
    //   src: '/hero-slides/interview-slide.png',
    //   title: 'interview',
    //   width: 330,
    // },
  ]

  return (
    <motion.section>
      <div className="hero-slide-up container mt-[32px] flex flex-col pb-[64px] md:mt-[74px]">
        <h1 className="hidden text-[64px] font-medium leading-tight md:block">
          Save time by letting us monitor your pages
        </h1>
        <h1 className="text-[30px] font-medium leading-tight md:hidden">
          Save time by letting us monitor your pages
        </h1>

        <p className="mt-4 max-w-[500px] text-[18px] leading-relaxed text-white/70 md:mt-6">
          <span className="text-neutral-100">
            {' '}
            Our AI monitors web pages and alerts you when important website changes happen
          </span>
        </p>

        <GetStartedButton
          className="my-[32px] bg-emerald-200 text-black hover:bg-emerald-300"
          text="Get Started – for free"
        />

        <Carousel
          className="mt-[16px] md:mt-[40px]"
          opts={{ loop: true }}
          plugins={[Autoscroll({ speed: 0.6 })]}
        >
          <CarouselContent className="flex">
            {carouselSlides.map((item) => (
              <CarouselItem
                className="border-secondary h-[300px] w-full min-w-0 max-w-full md:basis-1/3 lg:basis-1/4"
                key={item.title}
              >
                <Image
                  alt={item.title}
                  className="h-full w-full rounded-lg object-cover"
                  height={item.height}
                  src={item.src}
                  width={item.width}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </motion.section>
  )
}
