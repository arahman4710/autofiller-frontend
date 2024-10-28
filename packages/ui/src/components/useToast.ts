// Inspired by react-hot-toast library
import { useEffect, useState } from 'react'

import type { TToastActionElement, TToastProps } from './Toast'

const TOAST_LIMIT = 2
const TOAST_REMOVE_DELAY = 1500

type TToasterToast = {
  action?: TToastActionElement
  description?: React.ReactNode
  id: string
  leftComponent?: React.ReactElement
  link?: React.ReactNode
  onClose?: () => void
  persist?: boolean
  secondaryLink?: React.ReactNode
  title?: React.ReactNode
} & TToastProps

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type TActionType = typeof actionTypes

type TAction =
  | {
      persist?: TToasterToast['persist']
      toastId?: TToasterToast['id']
      type: TActionType['DISMISS_TOAST']
    }
  | {
      toast: Partial<TToasterToast>
      type: TActionType['UPDATE_TOAST']
    }
  | {
      toast: TToasterToast
      type: TActionType['ADD_TOAST']
    }
  | {
      toastId?: TToasterToast['id']
      type: TActionType['REMOVE_TOAST']
    }

interface IState {
  toasts: TToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      toastId: toastId,
      type: 'REMOVE_TOAST',
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: IState, action: TAction): IState => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      }

    case 'DISMISS_TOAST': {
      const { persist, toastId } = action

      if (persist) {
        return {
          ...state,
        }
      }

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: IState) => void> = []

let memoryState: IState = { toasts: [] }

function dispatch(action: TAction) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type TToast = Omit<{ toastId?: string } & TToasterToast, 'id'>

function toast({ ...props }: TToast) {
  const id = props.toastId ?? genId()

  const update = (props: TToasterToast) =>
    dispatch({
      toast: { ...props, id },
      type: 'UPDATE_TOAST',
    })
  const dismiss = () => dispatch({ persist: props.persist, toastId: id, type: 'DISMISS_TOAST' })

  dispatch({
    toast: {
      ...props,
      id,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
      open: true,
    },
    type: 'ADD_TOAST',
  })

  return {
    dismiss,
    id,
    update,
  }
}

function useToast() {
  const [state, setState] = useState<IState>(memoryState)

  useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    dismiss: (toastId?: string) => dispatch({ toastId, type: 'DISMISS_TOAST' }),
    errorToast: (props?: TToast) =>
      toast({
        description: 'Something went wrong.',
        title: 'Error',
        variant: 'destructive',
        ...props,
      }),
    successToast: (props?: TToast) =>
      toast({
        variant: 'success',
        ...props,
      }),
    toast,
  }
}

export { toast, useToast }
