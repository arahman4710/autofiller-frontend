import { CanyonLogoFull } from '@rag/ui/CanyonLogo'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto pt-36">
        <CanyonLogoFull />
      </div>
      <div className="border-border-secondary bg-background-secondary mx-auto my-[200px] flex w-[400px] max-w-[350px] flex-col gap-4 rounded-md border p-8 md:max-w-full">
        {children}
      </div>
    </div>
  )
}
