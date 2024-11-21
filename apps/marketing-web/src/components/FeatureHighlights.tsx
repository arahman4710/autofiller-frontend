'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@rag/ui/utils/cn'
import {
  DotFilledIcon,
  MagicWandIcon,
  SewingPinFilledIcon,
  TargetIcon,
} from '@radix-ui/react-icons'
import Autoscroll from 'embla-carousel-auto-scroll'
import { motion, stagger, useAnimation, useInView } from 'framer-motion'
import Image from 'next/image'

import { SparkleIcon } from '@/components/SparkleIcon'
import { getRandomDateString, move } from '@/utils'

export const FeatureHighlights = () => {
  return (
    <div className="mx-auto my-10 flex flex-col gap-3">
      <div className="flex flex-col gap-3 md:flex-row">
        <Box className="basis-1/3 bg-indigo-600 text-white">
          <CanyonScore />
          <div>
            <BoxTitle>Canyon Score ™</BoxTitle>
            <BoxDescription className="text-stone-200">
              Canyon Score measures the contents of your resume with industry standards to give you
              realtime feedback.
            </BoxDescription>
          </div>
        </Box>
        <Box className="relative basis-2/3 bg-stone-800">
          <OptimizeResumeAnimation />
          <div>
            <BoxTitle className="text-stone-200">Optimize Your Resume</BoxTitle>
            <BoxDescription className="text-stone-400">
              Tailor resumes to job descriptions with ease.
            </BoxDescription>
          </div>
        </Box>
      </div>
      <div className="flex flex-col gap-3 md:flex-row">
        <Box className="basis-1/2 bg-stone-300 px-0">
          <ApplicationRolodexAnimation />
          <div className="px-[20px]">
            <BoxTitle className="text-stone-800">Manage and Track Applications</BoxTitle>
            <BoxDescription>Everywhere you&apos;ve applied, all in one place.</BoxDescription>
          </div>
        </Box>
        <Box className="basis-1/2 bg-slate-300">
          <ExtensionContent />
          <div>
            <BoxTitle className="text-stone-900">Auto-fill Job Applications</BoxTitle>
            <BoxDescription>
              Apply to more jobs in less time with our Chrome extension, which supports major job
              boards such as LinkedIn, Workday, Indeed, Greenhouse, Lever, Glassdoor, and many more.
            </BoxDescription>
          </div>
        </Box>
      </div>
      <div className="flex">
        <Box className="w-full bg-slate-900">
          <EndingFeatures />
        </Box>
      </div>
    </div>
  )
}

const Box = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('flex flex-col justify-between overflow-hidden rounded-lg p-[20px]', className)}
      {...props}
    >
      {children}
    </div>
  )
}

const BoxTitle = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <h3 className={cn('text-lg font-semibold leading-snug md:text-xl', className)} {...props}>
      {children}
    </h3>
  )
}

const BoxDescription = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={cn('text-sm leading-relaxed', className)} {...props}>
      {children}
    </p>
  )
}

const CanyonScore = () => {
  const STARTING_POSITION = 67
  const END_POSITION = 92

  const [displayValue, setDisplayValue] = useState(STARTING_POSITION)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    let animationFrame: number

    const animateGauge = () => {
      if (shouldAnimate && displayValue < END_POSITION) {
        setDisplayValue((prev) => prev + 0.5)
      } else if (!shouldAnimate && displayValue > STARTING_POSITION) {
        setDisplayValue((prev) => prev - 0.5)
      }
      animationFrame = requestAnimationFrame(animateGauge)
    }

    animationFrame = requestAnimationFrame(animateGauge)

    return () => cancelAnimationFrame(animationFrame)
  }, [shouldAnimate, displayValue])

  const radius = 60
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (circumference * displayValue) / 100

  return (
    <div
      className="relative flex h-40 w-full select-none items-center justify-center md:h-60"
      onMouseEnter={() => setShouldAnimate(true)}
      onMouseLeave={() => setShouldAnimate(false)}
    >
      <svg className="absolute h-full w-full -rotate-[180deg] transform">
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="gauge-gradient">
            <stop offset="0%" stopColor="yellow" />
            <stop offset="100%" stopColor="green" />
          </linearGradient>
        </defs>
        <motion.circle
          cx="50%"
          cy="50%"
          fill="none"
          r={radius}
          stroke="url(#gauge-gradient)"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          strokeWidth="6%"
        />
      </svg>
      <div className="absolute text-[48px] font-bold">{Math.round(displayValue)}</div>
    </div>
  )
}

const OptimizeResumeAnimation = () => {
  const logos = [
    {
      image: '/app-logos/airbnb.webp',
      title: 'Airbnb',
    },
    {
      image: '/app-logos/pinterest.webp',
      title: 'Pinterest',
    },
    {
      image: '/app-logos/spotify.webp',
      title: 'Spotify',
    },
    {
      image: '/app-logos/affirm.webp',
      title: 'Affirm',
    },
    {
      image: '/app-logos/twitch.webp',
      title: 'Twitch',
    },
    {
      image: '/app-logos/figma.webp',
      title: 'Figma',
    },
    {
      image: '/app-logos/ramp.webp',
      title: 'Ramp',
    },
    {
      image: '/app-logos/paypal.webp',
      title: 'PayPal',
    },
    {
      image: '/app-logos/uber-eats.webp',
      title: 'Uber Eats',
    },
    {
      image: '/app-logos/dropbox.webp',
      title: 'Dropbox',
    },
    {
      image: '/app-logos/nike.webp',
      title: 'Nike',
    },
  ]

  const getRandomTopPosition = () => `${Math.floor(Math.random() * 70) + 10}%`

  const getRandomDuration = () => Math.random() * 5 + 12 // from 10 to 15 seconds
  const getRandomDelay = () => Math.random() * 12

  return (
    <div className="relative flex h-40 w-full overflow-hidden md:h-60">
      {logos.map((logo, index) => (
        <motion.img
          alt={logo.title}
          animate={{ x: -1000 }}
          className="absolute right-0 h-[24px] w-[24px] rounded-[8px] md:h-[48px] md:w-[48px] md:rounded-[16px]"
          initial={{ x: '100%' }}
          key={index}
          src={logo.image}
          style={{
            top: getRandomTopPosition(),
            transform: 'translateY(-50%)',
          }}
          transition={{
            x: {
              delay: getRandomDelay(),
              duration: getRandomDuration(),
              ease: 'linear',
              repeat: Infinity,
            },
          }}
        />
      ))}

      <div className="z-10 flex w-full flex-col items-center justify-end">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[120px] w-[80%] rounded-tl-lg rounded-tr-lg bg-white p-3 leading-snug md:h-[210px] md:w-[300px] md:px-6 md:pt-[24px]"
          initial={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full text-sm">
            <div className="text-center">Tina Belcher</div>
            <div className="text-xs">
              <div className="border-b-0.5 mb-1 w-full border-black pb-0.5">Summary</div>
              <p className="mt-2 overflow-hidden">
                An accomplished professional with extensive experience in hospitality, demonstrating
                expertise in customer service, and a proven track record of successfully managing
                and overseeing restaurants.
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-1/5 w-full bg-gradient-to-b from-transparent to-stone-800 to-40% backdrop-blur-md md:h-1/4"></div>
        </motion.div>
      </div>
    </div>
  )
}

const ApplicationRolodexAnimation = () => {
  const CARD_OFFSET = 10
  const SCALE_FACTOR = 0.06

  const CARDS: {
    company: string
    date: string
    location: string
    logo: string
    position: string
    salary: string
    status: string
  }[] = [
    {
      company: 'Dropbox',
      date: getRandomDateString(6),
      location: 'Remote',
      logo: '/app-logos/dropbox.webp',
      position: 'Product Manager',
      salary: '$100K-$200K',
      status: 'Applied',
    },
    {
      company: 'Airbnb',
      date: getRandomDateString(6),
      location: 'Los Angeles, CA',
      logo: '/app-logos/airbnb.webp',
      position: 'Marketing Analyst',
      salary: '$100K-$200K',
      status: 'Interviewing',
    },
    {
      company: 'Spotify',
      date: getRandomDateString(6),
      location: 'New York City, NY',
      logo: '/app-logos/spotify.webp',
      position: 'Senior Software Engineer',
      salary: '$100K-$200K',
      status: 'Offer',
    },
    {
      company: 'Affirm',
      date: getRandomDateString(6),
      location: 'Hybrid',
      logo: '/app-logos/affirm.webp',
      position: 'Head of Growth',
      salary: '$100K-$200K',
      status: 'Interviewing',
    },
  ]

  const [cards, setCards] = useState(CARDS)

  const moveToEnd = (fromIndex: number) => {
    setCards((prevCards) => move(prevCards, fromIndex, prevCards.length - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      moveToEnd(0)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const statusColorFill = {
    Applied: 'bg-yellow-300 text-yellow-300',
    Interviewing: 'bg-orange-300 text-orange-300',
    Offer: 'bg-green-300 text-green-300',
  }

  return (
    <div className="relative flex items-center justify-center pb-2 pt-8">
      <ul className="relative flex h-[180px] w-full items-center justify-center p-4">
        {cards.map((card, index) => {
          const isCurrent = index === 0

          if (index > 2) {
            return null
          }

          return (
            <motion.li
              animate={{
                scale: 1 - index * SCALE_FACTOR,
                top: index * -CARD_OFFSET,
                zIndex: CARDS.length - index,
              }}
              className={cn(
                'absolute top-[40px] w-full max-w-[90%] rounded-lg border border-stone-600 bg-stone-700 px-4 py-4 md:w-[380px]',
                !isCurrent && 'opacity-50'
              )}
              key={`${card.company}-${card.position}-${card.date}`}
              transition={{
                ease: 'linear',
              }}
            >
              <div className="text-text flex flex-col text-sm">
                <div className="flex justify-between">
                  <div className="flex justify-start gap-2">
                    <motion.img
                      className="mt-0.5 h-[16px] w-[16px] rounded-[6px]"
                      src={card.logo}
                    />
                    <div className="flex flex-col">
                      <div>{card.company}</div>
                      <div className="text-muted-foreground">{card.position}</div>
                    </div>
                  </div>
                  <div className="text-muted-foreground text-xs">{card.date}</div>
                </div>
                <hr className="my-2.5 h-0.5 border-stone-600" />
                <div className="flex flex-wrap gap-2">
                  <TagPill
                    className={cn('border-0.5 rounded-full border-stone-600 px-3 py-1.5')}
                    icon={
                      <div
                        className={cn(
                          'h-1.5 w-1.5 rounded-full',
                          statusColorFill[card.status as keyof typeof statusColorFill]
                        )}
                      />
                    }
                  >
                    {card.status}
                  </TagPill>
                  <TagPill
                    className=""
                    icon={<SewingPinFilledIcon className="h-3 w-3 text-red-400" />}
                  >
                    {card.location}
                  </TagPill>
                  <TagPill className="" icon={<TargetIcon className="h-3 w-3 text-green-400" />}>
                    {card.salary}
                  </TagPill>
                </div>
              </div>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}

const TagPill = ({
  children,
  className,
  icon,
}: {
  children: React.ReactNode
  className?: string
  icon: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'border-0.5 flex items-center gap-1.5 rounded-full border-stone-600 px-3 py-1.5 text-xs',
        className
      )}
    >
      {icon} {children}
    </div>
  )
}

const ExtensionContent = () => {
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')

  const handleAutofillApplicationClick = async () => {
    const location = await fetch('/api/user-locale')
    const locationData = await location.json()

    if (locationData.city && locationData.country) {
      setCity(locationData.city)
      setCountry(locationData.country)

      return
    }

    setCity('Seoul')
    setCountry('SK')
  }

  const hrisLogos = [
    {
      alt: 'Lever',
      image: '/hris-logos/lever.svg',
    },
    {
      alt: 'Workday',
      image: '/hris-logos/workday.svg',
    },
    {
      alt: 'Greenhouse',
      image: '/hris-logos/greenhouse.svg',
    },
    {
      alt: 'LinkedIn',
      image: '/hris-logos/linkedin.svg',
    },
    {
      alt: 'Indeed',
      image: '/hris-logos/indeed.svg',
    },
  ]

  return (
    <div className="relative flex h-[200px] w-full items-center justify-center md:h-[240px]">
      <div className="border-0.5 absolute bottom-0 top-0 h-fit w-full rounded-lg border-slate-400 bg-slate-100 bg-transparent md:h-[200px] md:w-[380px]">
        <div className="flex flex-col">
          <div className="border-b-0.5 flex gap-1.5 border-slate-400 px-3 py-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div className="h-[5px] w-[5px] rounded-full bg-slate-400" key={index}></div>
            ))}
          </div>
          <div className="flex flex-col gap-4 p-3">
            <div className="flex flex-col gap-2">
              <Image alt="Acme Inc" height={70} src="/acme-inc-logo.svg" width={70} />
              <div>
                <span className="mb-1 text-[11px]">About the role</span>
                <p className="text-xs">
                  The ideal marketing analyst will have a strong proficiency in data analysis and
                  visualization tools, coupled with an ability to interpret market trends and
                  consumer behavior to inform strategic decisions.
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-3">
              <div className="flex gap-3 text-xs text-slate-800">
                <input
                  className="flex h-6 w-1/2 items-center rounded-md bg-slate-200 pl-2 outline-none"
                  placeholder="City"
                  value={city}
                ></input>
                <input
                  className="flex h-6 w-1/2 items-center rounded-md bg-slate-200 pl-2 outline-none"
                  placeholder="Country"
                  value={country}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 z-20 hidden h-[50px] w-[190px] items-center justify-center rounded-lg md:flex">
        <button
          className="shadow-highlight-hard border-0.5 rounded-full border-amber-500 bg-amber-200 px-3 py-1.5 text-sm text-amber-800 transition-all ease-in-out hover:scale-105"
          onClick={handleAutofillApplicationClick}
        >
          Autofill Application
        </button>
      </div>
      <div className="absolute bottom-0 left-0 flex h-0 w-full items-end bg-gradient-to-b from-transparent to-slate-300 to-40% pb-4 backdrop-blur-md md:h-1/4">
        {/* <Carousel
          className="w-full"
          opts={{ loop: true }}
          plugins={[Autoscroll({ delay: 1000, speed: 1 })]}
        >
          <CarouselContent className="flex w-full items-center justify-between">
            {hrisLogos.map((logo) => (
              <CarouselItem className="min-w-0 basis-1/5" key={logo.alt}>
                <Image alt={logo.alt} height={75} src={logo.image} width={75} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel> */}
      </div>
    </div>
  )
}

const OvalGradient = () => {
  return (
    <div
      className="noise opaciy-85 absolute inset-0 -left-[100px] -top-[200px] rounded-full bg-gradient-to-r from-purple-800 via-purple-600 to-purple-400 blur-lg filter md:h-[350px] md:w-2/3"
      style={{ borderRadius: '22% 78% 61% 39% / 28% 37% 63% 72%' }}
    ></div>
  )
}

const EndingFeatures = () => {
  const features = [
    {
      description:
        'Generate a cover letter tailored to the job description and your personal background.',
      title: 'Cover Letter Generator',
    },
    {
      description: 'Optimize your resume to pass through Applicant Tracking Systems (ATS).',
      title: 'ATS Optimizer',
    },
    {
      description:
        'Prepare for interviews with tailored practice questions that contexualizes both the job description and your background.',
      title: 'Mock Interviews',
    },
    {
      comingSoon: true,
      description: 'Extensive analytics and suggestions to help you make data-driven decisions.',
      title: 'Analytics',
    },
  ]

  return (
    <div className="relative flex h-fit w-full text-white">
      <OvalGradient />
      <div className="z-10 w-full p-6">
        <div className="flex w-full flex-col justify-between gap-10 md:flex-row">
          <div className="flex flex-col gap-2 md:max-w-[500px]">
            <div className="flex flex-col items-center gap-3 md:flex-row">
              <MagicWandIcon className="size-4" />
              <h2 className="text-2xl font-semibold leading-snug">
                The Power of Embedded Intelligence
              </h2>
            </div>
            <p className="text-[14px] leading-relaxed text-white/90">
              Fight fire with fire. Canyon weaves the latest advancements in Large Language Models
              and AI throughout our platform to maximize your chance of landing your dream role.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                className="border-0.5 flex flex-col gap-2 rounded-lg border-white/10 bg-white/10 p-4 text-sm text-white"
                key={index}
              >
                <div className="flex items-center gap-2">
                  <div>{feature.title}</div>
                  {feature.comingSoon && (
                    <div className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/80">
                      Coming Soon
                    </div>
                  )}
                </div>
                <p className="text-white/90">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
