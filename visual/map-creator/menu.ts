// import { Species } from "~/representation/UnitFactory"
// import getFactionMenuItem from "./get-faction-menu-item"

// export interface FactionVisualDetails {
//   bodyMatrixColorFilter: number[]
//   headMatrixColorFilter: number[]
//   species: Species
// }

// const containerId = 'map-creator-menu'
// const factionsListId = 'factions-list'
// const startGameBtnId = 'start-game-button'
// const factionVisualDetailsGetters: Array<() => FactionVisualDetails> = []

// export const createMenu = (
//   startGameCallback: (factionVisualDetails: FactionVisualDetails[],
// ) => void) => {
//   const divNode = document.createElement('div')
//   divNode.id = containerId
//   divNode.innerHTML = `
//     <button id="${startGameBtnId}">
//       START
//     </button>
//     <ul id="${factionsListId}"></ul>
//   `
//   document.body.appendChild(divNode)

//   const startGameBtn = document.getElementById(startGameBtnId)
//   startGameBtn.addEventListener('click', () => {
//     const factionVisualDetails = factionVisualDetailsGetters.map(getter => getter())
//     startGameCallback(factionVisualDetails)
//     document.body.removeChild(divNode)
//   })
// }

// export const addNewFaction = () => {
//   const listNode = document.getElementById(factionsListId)
//   const { node, getFactionDetails } = getFactionMenuItem()
//   listNode.appendChild(node)
//   factionVisualDetailsGetters.push(getFactionDetails)
// }










