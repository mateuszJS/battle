import { REPRESENTATIONS_DETAILS } from '~/constants'
import Factory from '~/representation/Factory'

const updateFactory = (
  factory: Factory,
  [hp, isProducing]: [number, number],
) => {
  if (isProducing) {
    factory.turnOnProduction()
  } else {
    factory.turnOffProduction()
  }
}

const getUpdater = (type: typeof REPRESENTATIONS_DETAILS[0]['type']) => {
  switch (type) {
    case 'factory':
      return updateFactory
  }
}

const getRepresentationsDetails = () =>
  REPRESENTATIONS_DETAILS.map(representationDetails => ({
    ...representationDetails,
    updater: getUpdater(representationDetails.type),
  }))

export default getRepresentationsDetails
