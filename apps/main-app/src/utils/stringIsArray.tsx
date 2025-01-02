const remove = [/\s+/g, /'(\\.|[^'])*'/g, /"(\\.|[^"])*"/g, /\d+/g]

const emptyArray = /\[,*\]/g

export function stringIsArray(str: string) {
  for (const r of remove) str = str.replace(r, '')

  if (str[0] !== '[') return false

  while (str.match(emptyArray)) str = str.replace(emptyArray, '')

  return str.length === 0
}
