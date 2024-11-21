'use client'

import { useEffect, useState } from 'react'

import { Carousel, CarouselContent, CarouselItem, type TCarouselApi } from '@canyon/ui/Carousel'
import { cn } from '@canyon/ui/utils/cn'
import { CopyIcon, FaceIcon, Pencil2Icon } from '@radix-ui/react-icons'

export const FeaturePreview = () => {
  const [selectedFeature, setSelectedFeature] = useState(0)
  const [api, setApi] = useState<TCarouselApi>()

  const features: {
    description: string
    icon: React.ReactNode
    poster: string
    title: string
    video: string
  }[] = [
    {
      description: 'Effortlessly build your resume and optimize where you need it.',
      icon: <Pencil2Icon />,
      poster: '/video-posters/resume-builder.png',
      title: 'Resume Builder',
      video: '/videos/resume-builder.mp4',
    },
    {
      description: 'Track all your job applications in one place.',
      icon: <CopyIcon />,
      poster: '/video-posters/job-applications.png',
      title: 'Track Job Applications',
      video: '/videos/job-applications.mp4',
    },
    {
      description: 'Practice technical and behavior interviews for any role.',
      icon: <FaceIcon />,
      poster: '/video-posters/mock-interviews.png',
      title: 'Practice Interviews',
      video: '/videos/mock-interview.mp4',
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
        <video
          autoPlay
          className="aspect-video w-full rounded-lg object-fill md:max-w-[800px]"
          key={features[selectedFeature].video}
          loop
          muted
          playsInline
          poster={features[selectedFeature].poster}
          preload="auto"
        >
          <source src={features[selectedFeature].video} type="video/mp4" />
        </video>
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
