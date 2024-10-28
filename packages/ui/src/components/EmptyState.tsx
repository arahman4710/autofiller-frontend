interface IEmptyStateProps {
  children?: React.ReactNode
  description: string
  title: string
}

export const EmptyState = ({ children, description, title }: IEmptyStateProps) => {
  return (
    <div className="flex justify-center py-[100px]">
      <div className="border-border-secondary bg-background-secondary flex w-[420px] flex-col justify-center gap-4 rounded-lg border p-8 pb-12 pt-8">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
        {children}
      </div>
    </div>
  )
}
