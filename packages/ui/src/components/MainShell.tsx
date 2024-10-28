import { cn } from '../utils'

interface IMainShellProps {
  children: React.ReactNode
  className?: string
}

export const MainShell = ({ children, className }: IMainShellProps) => {
  return (
    <main
      className={cn(
        'relative h-screen w-full snap-x overflow-x-auto overflow-y-hidden px-6 py-3 md:h-full md:snap-none',
        className
      )}
    >
      {children}
    </main>
  )
}
