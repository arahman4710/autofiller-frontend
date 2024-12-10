'use client'

import { useEffect, useState } from 'react'

import { DownloadIcon, FaceIcon, MagicWandIcon, PaperPlaneIcon } from '@radix-ui/react-icons'
import { Carousel, CarouselContent, CarouselItem, type TCarouselApi } from '@rag/ui/Carousel'
import { cn } from '@rag/ui/utils/cn'

export const FeaturePreview = () => {
  const [selectedFeature, setSelectedFeature] = useState(0)
  const [api, setApi] = useState<TCarouselApi>()

  const features: {
    description: string
    icon: React.ReactNode
    image: string
    title: string
  }[] = [
    {
      description: 'Use AI to extract any website data.',
      icon: <MagicWandIcon />,
      image: '/images/page-check.png',
      title: 'Monitor web pages using AI',
    },
    {
      description: 'Extract data on a schedule and get notified on changes.',
      icon: <PaperPlaneIcon />,
      image: '/images/page-check.png',
      title: 'Notifications on relevant changes',
    },
    {
      description: 'Export anywhere.',
      icon: <DownloadIcon />,
      image: '/images/page-check.png',
      title: 'Export your data to over 6000 destinations',
    },
  ]

  useEffect(() => {
    if (!api) return

    api.on('select', () => {
      setSelectedFeature(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="my-6 flex flex-col items-start gap-8 md:flex-row">
      <div className="border-0.5 hidden h-full basis-0 flex-col gap-2 rounded-lg border-stone-300 bg-stone-300/20 p-2 md:flex md:basis-1/3">
        {features.map((feature, index) => (
          <div
            className={cn(
              'flex cursor-pointer items-start gap-2 rounded-lg p-[20px] leading-snug',
              index === selectedFeature
                ? 'border-0.5 border-stone-300 bg-stone-300/50'
                : 'bg-transparent hover:bg-stone-300/30'
            )}
            key={feature.title}
            onClick={() => setSelectedFeature(index)}
          >
            <div className="mt-1">{feature.icon}</div>
            <div>
              <h4 className="font-semibold text-stone-950">{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={cn('z-2 basis-3/3 flex aspect-video justify-end rounded-lg md:basis-2/3')}>
        <img 
         alt="Monitor website pages using AI"
         className="aspect-video w-full rounded-lg object-fill md:max-w-[800px]"
         src={features[selectedFeature].image}
        />
      </div>
      <Carousel className="w-full md:hidden" opts={{ align: 'start', loop: true }} setApi={setApi}>
        <CarouselContent>
          {features.map((feature, index) => (
            <CarouselItem className="max-w-[calc(100%-48px)] text-sm" key={feature.title}>
              <div
                className={cn(
                  'border-0.5 h-[100px] cursor-pointer rounded-lg border-stone-300 bg-stone-300/60 p-[16px]',
                  index !== selectedFeature && 'bg-stone-300/20 text-stone-400'
                )}
              >
                {feature.icon}
                <h4
                  className={cn(
                    'mt-2 font-semibold',
                    index !== selectedFeature && 'text-stone-400'
                  )}
                >
                  {feature.title}
                </h4>
                <p>{feature.description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
