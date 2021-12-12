import getFactionMenuItem from "./get-faction-menu-item"

const containerId = 'map-creator-menu'
const factionsListId = 'factions-list'
const startGameBtnId = 'start-game-button'
const listOfFilterMatrixes: number[][] = []

export const createMenu = (startGameCallback: (matrixes: number[][]) => void) => {
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
    startGameCallback(listOfFilterMatrixes)
    document.body.removeChild(divNode)
  })
}

export const addNewFaction = () => {
  const listNode = document.getElementById(factionsListId)
  const { node, filterMatrix } = getFactionMenuItem()
  listNode.appendChild(node)
  listOfFilterMatrixes.push(filterMatrix)
}










