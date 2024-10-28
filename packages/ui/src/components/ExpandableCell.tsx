import { useEffect, useRef, useState } from 'react'

import { cn } from '../utils'

interface IExpandableCellProps {
  cellSize: number
  children: React.ReactNode
}

export const ExpandableCell = ({ cellSize, children }: IExpandableCellProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const cellRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cellRef.current && !cellRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleExpand = (event: React.MouseEvent): void => {
    event.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="relative select-none" ref={cellRef}>
      <div className="overflow-hidden" onClick={toggleExpand}>
        {children}
      </div>
      {isExpanded && (
        <div
          className="bg-background-secondary absolute z-50 rounded border border-blue-500 p-4 shadow-lg"
          ref={contentRef}
          style={{
            left: '50%',
            maxHeight: '300px',
            maxWidth: '400px',
            minWidth: cellSize,
            overflowY: 'auto',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}
