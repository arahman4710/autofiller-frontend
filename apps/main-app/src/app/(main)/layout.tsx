// import { AddBusinessNameRedirect } from '@/components/AddBusinessNameRedirect'
import { PageToolbar } from '@/components/PageToolbar'
import { Sidebar } from '@/components/Sidebar'
import { MobileHeader } from '@/components/mobile/MobileHeader'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col md:flex-row">
      {/* <AddBusinessNameRedirect /> */}
      <Sidebar />
      <MobileHeader />
      <div className="border-border bg-background-secondary mt-1 flex w-full flex-col overflow-hidden border-t md:mt-6 md:rounded-tl-xl md:border-l">
        <PageToolbar />
        {children}
      </div>
    </div>
  )
}
