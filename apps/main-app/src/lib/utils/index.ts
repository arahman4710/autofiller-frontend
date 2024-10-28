import { Style } from '@react-pdf/types'

export function mergePdfStyles(styles: Style[]): Style {
  return styles.reduce((prev: Style, current: Style) => {
    return { ...prev, ...current }
  }, {})
}
