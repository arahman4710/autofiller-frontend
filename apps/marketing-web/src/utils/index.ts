export const getRandomDateString = (daysAgo: number) => {
  const now = new Date()
  const sixDaysAgo = new Date()
  sixDaysAgo.setDate(now.getDate() - daysAgo)

  const getRandomTimestamp = (start: Date, end: Date) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  }

  const randomDate = getRandomTimestamp(sixDaysAgo, now)
  const month = randomDate.getMonth() + 1
  const day = randomDate.getDate()
  const year = randomDate.getFullYear()

  return `${month}/${day}/${year}`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const move = (arr: any[], fromIndex: number, toIndex: number) => {
  const element = arr[fromIndex]
  const newArray = [...arr]
  newArray.splice(fromIndex, 1)
  newArray.splice(toIndex, 0, element)
  return newArray
}
