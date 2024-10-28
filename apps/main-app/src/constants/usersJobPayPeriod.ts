import { UsersJobsPayPeriodEnum } from '@gql/graphql'

/* eslint-disable perfectionist/sort-objects */
export const payPeriodOptions: Record<UsersJobsPayPeriodEnum, string> = {
  [UsersJobsPayPeriodEnum.Yearly]: 'Yearly',
  [UsersJobsPayPeriodEnum.Monthly]: 'Monthly',
  [UsersJobsPayPeriodEnum.Weekly]: 'Weekly',
  [UsersJobsPayPeriodEnum.Hourly]: 'Hourly',
}
/* eslint-enable perfectionist/sort-objects */
