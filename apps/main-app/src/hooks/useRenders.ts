import { useRef } from 'react'

export const useRenders = () => {
  const rendersRef = useRef(0)
  rendersRef.current++
  return rendersRef.current
}
