'use client'

import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'

import { DashboardContent_ItemsDataDocument } from '@gql/graphql'

import { generateTodoItems } from '@/utils/generateTodoItems'

import { ListHeader } from '../components/ListHeader'
import { ListTodoRow } from '../components/ListTodoRow'

export const DashboardContent = ({}) => {
  const { data } = useSuspenseQuery(DashboardContent_ItemsDataDocument)
  const todoItems = generateTodoItems(data)
  const todoItemsCount = todoItems.filter((todoItem) => todoItem.checked === false).length

  return (
    <div className="mt-3 flex flex-col rounded-bl-lg rounded-br-lg">
      <ListHeader complete={todoItemsCount === 0} isFirst={true} title="To-do" />
      {todoItems.map((todoListItem, index) => (
        <div className="bg-background/40 flex h-full w-full w-full flex-col" key={index}>
          <ListTodoRow
            checked={todoListItem.checked}
            header={todoListItem.header}
            href={todoListItem.href}
            icon={todoListItem.icon}
            isLast={index === todoItems.length - 1}
            openInNewTab={todoListItem.openInNewTab}
            subText={todoListItem.subText}
          />
        </div>
      ))}
    </div>
  )
}
