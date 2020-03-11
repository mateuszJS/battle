const BASE_ID = 1_000_000
export const FACTION_BASE_ID = BASE_ID

export const REPRESENTATIONS_DETAILS = [
  {
    // factory
    type: 'factory' as const,
    baseId: 2 * BASE_ID,
    length: 3,
  },
  {
    // faction
    type: 'faction' as const,
    baseId: FACTION_BASE_ID,
    length: 1,
  },
]
