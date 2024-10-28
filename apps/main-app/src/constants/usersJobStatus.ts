import { UsersJobsStatusEnum } from '@gql/graphql'

/* eslint-disable perfectionist/sort-objects */
export const statusTitles: Record<
  UsersJobsStatusEnum,
  {
    borderColor: string
    color: string
    title: string
  }
> = {
  [UsersJobsStatusEnum.Wishlist]: {
    borderColor: 'border-slate-300',
    color: 'bg-slate-300',
    title: 'Wishlist',
  },
  [UsersJobsStatusEnum.Applied]: {
    borderColor: 'border-yellow-300',
    color: 'bg-yellow-300',
    title: 'Applied',
  },
  [UsersJobsStatusEnum.Interview]: {
    borderColor: 'border-orange-300',
    color: 'bg-orange-300',
    title: 'Interviewing',
  },
  [UsersJobsStatusEnum.Offer]: {
    borderColor: 'border-green-300',
    color: 'bg-green-300',
    title: 'Offer',
  },
  [UsersJobsStatusEnum.Rejected]: {
    borderColor: 'border-rose-300',
    color: 'bg-rose-300',
    title: 'Rejected',
  },
}

export const statusOptions: Record<UsersJobsStatusEnum, string> = {
  [UsersJobsStatusEnum.Wishlist]: 'Wishlist',
  [UsersJobsStatusEnum.Applied]: 'Applied',
  [UsersJobsStatusEnum.Interview]: 'Interviewing',
  [UsersJobsStatusEnum.Offer]: 'Offer',
  [UsersJobsStatusEnum.Rejected]: 'Rejected',
}
/* eslint-enable perfectionist/sort-objects */
