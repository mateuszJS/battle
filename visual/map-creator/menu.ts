import getFactionMenuItem from "./get-faction-menu-item"

export interface FactionVisualDetails {
  bodyMatrixColorFilter: number[]
  headMatrixColorFilter: number[]
}

const containerId = 'map-creator-menu'
const factionsListId = 'factions-list'
const startGameBtnId = 'start-game-button'
const factionVisualDetails: FactionVisualDetails[] = []

export const createMenu = (
  startGameCallback: (factionVisualDetails: FactionVisualDetails[],
) => void) => {
  const divNode = document.createElement('div')
  divNode.id = containerId
  divNode.innerHTML = `
    <button id="${startGameBtnId}">
      START
    </button>
    <ul id="${factionsListId}"></ul>
  `
  document.body.appendChild(divNode)

  const startGameBtn = document.getElementById(startGameBtnId)
  startGameBtn.addEventListener('click', () => {
    startGameCallback(factionVisualDetails)
    document.body.removeChild(divNode)
  })
}

export const addNewFaction = () => {
  const listNode = document.getElementById(factionsListId)
  const { node, ...factionDetails } = getFactionMenuItem()
  listNode.appendChild(node)
  factionVisualDetails.push(factionDetails)
}










