interface IGetWorkExperienceLocationParams {
  workExperience: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const getWorkExperienceLocation = ({
  workExperience,
}: IGetWorkExperienceLocationParams): string => {
  const workPositionLocationsAreEqual = workExperience?.workPositionsAttributes?.reduce(
    (acc, workPosition) => {
      return acc && workPosition.location === workExperience?.workPositionsAttributes[0]?.location
    },
    true
  )

  if (workPositionLocationsAreEqual) {
    return workExperience?.workPositionsAttributes[0]?.location ?? ''
  }

  return ''
}
