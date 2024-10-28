interface ITabContentContainerProps {
  children: React.ReactNode
  title: string
}

export const TabContentContainer = ({ children, title }: ITabContentContainerProps) => {
  return (
    <div className="flex flex-col gap-3.5 p-6">
      <h3 className="text-gray-9000 text-lg font-light">{title}</h3>
      <main>{children}</main>
    </div>
  )
}
