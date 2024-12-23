import { PageCheckTypeEnum } from '@gql/graphql'

export const pageCheckTypeOptions: Record<PageCheckTypeEnum, string> = {
  [PageCheckTypeEnum.Generic]: 'Generic',
  [PageCheckTypeEnum.JobTitles]: 'Company open jobs scanner',
  [PageCheckTypeEnum.Price]: 'Price tracker',
}
