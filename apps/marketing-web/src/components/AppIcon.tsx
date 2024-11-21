import Image from 'next/image'

export const AppIcon = ({ image }: { image: string }) => {
  return (
    <div className="border-0.5 relative h-[64px] w-[64px] overflow-hidden rounded-[16px] border-neutral-300">
      <Image alt="App Icon" height={460} src={image} width={460} />
    </div>
  )
}
