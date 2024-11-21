export const SectionHeader = ({ subtitle, title }: { subtitle?: string; title: string }) => {
  return (
    <div className="my-10 space-y-2 text-center">
      <h2 className="text-2xl font-semibold md:text-3xl">{title}</h2>
      <p className="text-white/90 md:text-[18px]">{subtitle}</p>
    </div>
  )
}
