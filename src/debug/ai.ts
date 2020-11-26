import { Universe } from '../../crate/pkg/index'
import { MAP_WIDTH, MAP_HEIGHT } from 'Consts'

const factions = []

const createNewFaction = () => {
  const debugPanelNode = document.querySelector('#debug-panel') as HTMLDivElement
  const groundNode = document.querySelector('.ground')
  const color = Math.floor(Math.random() * 16777215)

  const faction = {
    id: factions.length,
    color: `#${color.toString(16)}`,
    complementaryColor: `#${(0xffffff ^ Number(color)).toString(16)}`,
    squads: [{ id: 0, x: 400, y: 400, isPortal: true }],
  }
  console.log(faction)
  const addNewSquad = (isPortal: boolean) => {
    const influence = isPortal ? 1.0 : 0.07
    const newSquad = { id: faction.squads.length, x: 400, y: 400, isPortal, influence }
    faction.squads.push(newSquad)
    const squadNode = document.createElement('div')
    squadNode.classList.add('squad')
    if (isPortal) {
      squadNode.classList.add('portal')
    }
    squadNode.dataset.id = `${newSquad.id}`
    squadNode.dataset.influence = `${newSquad.influence}`
    squadNode.style.color = faction.complementaryColor
    squadNode.style.backgroundColor = faction.color
    squadNode.style.left = `${newSquad.x}px`
    squadNode.style.top = `${newSquad.y}px`
    squadNode.innerText = `${newSquad.id}`
    groundNode.appendChild(squadNode)

    let isDown = false
    squadNode.addEventListener('mousedown', () => {
      isDown = true
    })

    document.addEventListener('mouseup', () => {
      isDown = false
    })

    document.addEventListener('mousemove', event => {
      event.preventDefault()
      if (isDown) {
        const deltaX = event.movementX
        const deltaY = event.movementY
        const rect = squadNode.getBoundingClientRect()
        squadNode.style.left = rect.x + deltaX + 'px'
        squadNode.style.top = rect.y + deltaY + 'px'
      }
    })
  }

  addNewSquad(true)

  const addSquadBtnNode = document.createElement('button')
  addSquadBtnNode.innerText = 'Add a new squad'
  addSquadBtnNode.style.color = faction.complementaryColor
  addSquadBtnNode.style.backgroundColor = faction.color
  debugPanelNode.appendChild(addSquadBtnNode)

  addSquadBtnNode.addEventListener('click', () => {
    addNewSquad(false)
  })

  factions.push(faction)
}

export const startDebug = (universe: Universe) => {
  if (!window.debugAiMode) {
    const debugPanelNode = document.querySelector('#debug-panel') as HTMLDivElement

    const addNewFactionBtnNode = document.createElement('button')
    addNewFactionBtnNode.id = 'add-faction'
    addNewFactionBtnNode.innerText = 'Create a new faction'
    debugPanelNode.appendChild(addNewFactionBtnNode)
    addNewFactionBtnNode.addEventListener('click', createNewFaction)

    const groundNode = document.createElement('div')
    groundNode.classList.add('ground')
    groundNode.style.width = `${MAP_WIDTH}px`
    groundNode.style.height = `${MAP_HEIGHT}px`
    document.body.appendChild(groundNode)

    const iterationBtnNode = document.createElement('button')
    iterationBtnNode.id = 'make-iteration'
    iterationBtnNode.innerText = 'Make iteration'
    debugPanelNode.appendChild(iterationBtnNode)
    window.debugAiMode = true
    // const result = universe.debug_track()
  }
}

export const stopDebug = () => {
  const debugPanelNode = document.querySelector<HTMLDivElement>('#debug-panel')
  const addFactionBtnNode = document.querySelector<HTMLButtonElement>('#add-faction')
  const makeIterationBtnNode = document.querySelector<HTMLButtonElement>('#make-iteration')
  const groundNode = document.querySelector<HTMLButtonElement>('.ground')
  console.log('stop', addFactionBtnNode)
  debugPanelNode.removeChild(addFactionBtnNode)
  document.body.removeChild(groundNode)
  debugPanelNode.removeChild(makeIterationBtnNode)
  window.debugAiMode = false
}
