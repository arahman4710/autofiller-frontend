import { cn } from '@canyon/ui/utils/cn'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

interface IGetStartedButtonProps extends React.ComponentProps<'a'> {
  className?: string
  href?: string
  text?: string
}

export const GetStartedButton = ({
  className,
  href,
  text = 'Get Started',
  ...props
}: IGetStartedButtonProps) => {
  return (
    <Link
      className={cn(
        'group flex w-fit cursor-pointer items-center gap-2 rounded-full bg-white/20 px-4 py-2 transition transition-all duration-300 ease-in-out ease-in-out hover:bg-white/30',
        className
      )}
      href={href ?? 'https://app.usecanyon.com/auth/signup'}
      {...props}
    >
      {text}
      <ChevronRightIcon className="h-3 w-3 transition-all ease-in-out group-hover:mr-3 group-hover:translate-x-3" />
    </Link>
  )
}
