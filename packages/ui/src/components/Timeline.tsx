import { forwardRef } from 'react'

import { CheckIcon, CircleIcon, Cross1Icon } from '@radix-ui/react-icons'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '../utils'

const timelineVariants = cva('grid', {
  defaultVariants: {
    positions: 'left',
  },
  variants: {
    positions: {
      center: '[&>li]:grid-cols-[1fr_min-content_1fr]',
      left: '[&>li]:grid-cols-[0_min-content_1fr]',
      right: '[&>li]:grid-cols-[1fr_min-content]',
    },
  },
})

interface ITimelineProps
  extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof timelineVariants> {}

const Timeline = forwardRef<HTMLUListElement, ITimelineProps>(
  ({ children, className, positions, ...props }, ref) => {
    return (
      <ul className={cn(timelineVariants({ positions }), className)} ref={ref} {...props}>
        {children}
      </ul>
    )
  }
)
Timeline.displayName = 'Timeline'

const timelineItemVariants = cva('grid items-center gap-x-4', {
  defaultVariants: {
    status: 'default',
  },
  variants: {
    status: {
      default: 'text-muted-foreground',
      done: 'text-primary',
    },
  },
})

interface ITimelineItemProps
  extends React.HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof timelineItemVariants> {}

const TimelineItem = forwardRef<HTMLLIElement, ITimelineItemProps>(
  ({ className, status, ...props }, ref) => (
    <li className={cn(timelineItemVariants({ status }), className)} ref={ref} {...props} />
  )
)
TimelineItem.displayName = 'TimelineItem'

const timelineDotVariants = cva(
  'col-start-2 col-end-3 row-start-1 row-end-1 flex size-4 items-center justify-center rounded-full border-0.5 border-border-secondary',
  {
    defaultVariants: {
      status: 'default',
    },
    variants: {
      status: {
        current:
          '[&>*:not(.radix-circle)]:hidden [&>.radix-circle]:bg-emerald-200 [&>.radix-circle]:bg-emerald-200 border-emerald-200',
        custom: '[&>*:not(:nth-child(4))]:hidden [&>*:nth-child(4)]:block',
        default: '[&>*]:hidden',
        done: 'bg-primary [&>*:not(.radix-check)]:hidden [&>.radix-check]:text-background',
        error:
          'border-destructive bg-destructive [&>*:not(.radix-cross)]:hidden [&>.radix-cross]:text-background',
      },
    },
  }
)

interface ITimelineDotProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineDotVariants> {
  customIcon?: React.ReactNode
}

const TimelineDot = forwardRef<HTMLDivElement, ITimelineDotProps>(
  ({ className, customIcon, status, ...props }, ref) => (
    <div
      className={cn('timeline-dot', timelineDotVariants({ status }), className)}
      ref={ref}
      role="status"
      {...props}
    >
      <div className="radix-circle size-2 rounded-full" />
      <CheckIcon className="radix-check size-2" />
      <Cross1Icon className="radix-cross size-2" />
      {customIcon}
    </div>
  )
)
TimelineDot.displayName = 'TimelineDot'

const timelineContentVariants = cva('row-start-2 row-end-2 pb-8 text-muted-foreground', {
  defaultVariants: {
    side: 'right',
  },
  variants: {
    side: {
      left: 'col-start-1 col-end-2 ml-auto text-right',
      right: 'col-start-3 col-end-4 mr-auto text-left',
    },
  },
})

interface ITimelineContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineContentVariants> {}

const TimelineContent = forwardRef<HTMLDivElement, ITimelineContentProps>(
  ({ className, side, ...props }, ref) => (
    <div className={cn(timelineContentVariants({ side }), className)} ref={ref} {...props} />
  )
)
TimelineContent.displayName = 'TimelineContent'

const timelineHeadingVariants = cva('row-start-1 row-end-1 line-clamp-1 max-w-full truncate', {
  defaultVariants: {
    side: 'right',
    variant: 'primary',
  },
  variants: {
    side: {
      left: 'col-start-1 col-end-2 ml-auto text-right',
      right: 'col-start-3 col-end-4 mr-auto text-left',
    },
    variant: {
      primary: 'text-base font-light text-text',
      secondary: 'text-sm font-light text-muted-foreground',
    },
  },
})

interface ITimelineHeadingProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof timelineHeadingVariants> {}

const TimelineHeading = forwardRef<HTMLParagraphElement, ITimelineHeadingProps>(
  ({ className, side, variant, ...props }, ref) => (
    <p
      aria-level={variant === 'primary' ? 2 : 3}
      className={cn(timelineHeadingVariants({ side, variant }), className)}
      ref={ref}
      role="heading"
      {...props}
    />
  )
)
TimelineHeading.displayName = 'TimelineHeading'

interface ITimelineLineProps extends React.HTMLAttributes<HTMLHRElement> {
  done?: boolean
}

const TimelineLine = forwardRef<HTMLHRElement, ITimelineLineProps>(
  ({ className, done = false, ...props }, ref) => {
    return (
      <hr
        aria-orientation="vertical"
        className={cn(
          'col-start-2 col-end-3 row-start-2 row-end-2 mx-auto flex h-full min-h-16 w-0.5 justify-center rounded-full',
          done ? 'bg-primary' : 'bg-muted',
          className
        )}
        ref={ref}
        role="separator"
        {...props}
      />
    )
  }
)
TimelineLine.displayName = 'TimelineLine'

export { Timeline, TimelineContent, TimelineDot, TimelineHeading, TimelineItem, TimelineLine }
