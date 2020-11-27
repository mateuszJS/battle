import { Universe } from '../../crate/pkg/index'
import { MAP_WIDTH, MAP_HEIGHT, GRID_MAP_SCALE_X, GRID_MAP_SCALE_Y } from 'Consts'

const factions = []

const createNewFaction = (id?: number, color?: string, complementaryColor?: string) => {
  const debugPanelNode = document.querySelector('#debug-panel') as HTMLDivElement
  const groundNode = document.querySelector('.ground')
  const newColor = Math.floor(Math.random() * 16777215)

  const faction = {
    id: id || factions.length,
    color: color || `#${newColor.toString(16)}`,
    complementaryColor: complementaryColor || `#${(0xffffff ^ Number(newColor)).toString(16)}`,
    squads: [],
  }

  const addNewSquad = (isPortal: boolean, x = 400, y = 400, id?: number) => {
    const influence = isPortal ? 1.0 : 0.07
    const newSquad = {
      id: id || faction.id * 100 + faction.squads.length,
      x,
      y,
      isPortal,
      influence,
    }
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
    squadNode.addEventListener('mousedown', event => {
      event.stopPropagation()
      isDown = true
    })

    document.addEventListener('mouseup', () => {
      isDown = false
    })

    document.addEventListener('mousemove', event => {
      if (isDown) {
        newSquad.x += event.movementX
        newSquad.y += event.movementY
        squadNode.style.left = newSquad.x + 'px'
        squadNode.style.top = newSquad.y + 'px'
      }
    })
  }

  const addSquadBtnNode = document.createElement('button')
  addSquadBtnNode.innerText = 'Add a new squad'
  addSquadBtnNode.style.color = faction.complementaryColor
  addSquadBtnNode.style.backgroundColor = faction.color
  debugPanelNode.appendChild(addSquadBtnNode)

  addSquadBtnNode.addEventListener('click', () => {
    addNewSquad(faction.squads.length === 0)
  })

  factions.push(faction)

  return addNewSquad
}

export const startDebug = (universe: Universe) => {
  if (!window.debugAiMode) {
    const debugPanelNode = document.querySelector('#debug-panel') as HTMLDivElement

    const addNewFactionBtnNode = document.createElement('button')
    addNewFactionBtnNode.id = 'add-faction'
    addNewFactionBtnNode.innerText = 'Create a new faction'
    debugPanelNode.appendChild(addNewFactionBtnNode)
    addNewFactionBtnNode.addEventListener('click', () => createNewFaction())

    const groundNode = document.createElement('div')
    groundNode.classList.add('ground')
    groundNode.style.width = `${MAP_WIDTH}px`
    groundNode.style.height = `${MAP_HEIGHT}px`

    const sizeX = 1 / GRID_MAP_SCALE_X
    const sizeY = 1 / GRID_MAP_SCALE_Y

    for (let x = 0; x < MAP_WIDTH; x += sizeX) {
      const line = document.createElement('div')
      line.classList.add('grid-line')
      line.style.width = '3px'
      line.style.height = `${MAP_HEIGHT}px`
      line.style.top = '0'
      line.style.left = `${x}px`
      groundNode.appendChild(line)
    }

    for (let y = 0; y < MAP_WIDTH; y += sizeY) {
      const line = document.createElement('div')
      line.classList.add('grid-line')
      line.style.height = '3px'
      line.style.width = `${MAP_WIDTH}px`
      line.style.left = '0'
      line.style.top = `${y}px`
      groundNode.appendChild(line)
    }

    document.body.appendChild(groundNode)

    let isDown = false
    groundNode.addEventListener('mousedown', () => {
      isDown = true
    })

    document.addEventListener('mouseup', event => {
      isDown = false
    })

    document.addEventListener('mousemove', event => {
      if (isDown) {
        const rect = groundNode.getBoundingClientRect()
        groundNode.style.left = rect.x + event.movementX + 'px'
        groundNode.style.top = rect.y + event.movementY + 'px'
      }
    })

    const iterationBtnNode = document.createElement('button')
    iterationBtnNode.id = 'make-iteration'
    iterationBtnNode.innerText = 'Make iteration'
    debugPanelNode.appendChild(iterationBtnNode)
    window.debugAiMode = true

    let lines = []

    iterationBtnNode.addEventListener('click', () => {
      lines.forEach(line => groundNode.removeChild(line))
      lines = []

      const input = factions.flatMap(({ squads }) => [
        -1,
        ...squads.flatMap(({ id, x, y }) => [id, x, y]),
      ])

      const result = universe.test_ai(new Float32Array(input))

      let index = 0 // do not care about first -2
      while (index < result.length) {
        // ai.ts?fd3c:123 Float32Array(5) [-2, -1, 615, 399, -3]
        const isAttack = result[index + 1] > 0
        const planX = result[index + 2]
        const planY = result[index + 3]
        const squadsIdsAndEnemiesIdsAndRest = result.slice(index + 4)
        const ourSquadsIdsEndIndex = squadsIdsAndEnemiesIdsAndRest.findIndex(value => value === -3)
        const ourSquadsIds = squadsIdsAndEnemiesIdsAndRest.slice(0, ourSquadsIdsEndIndex)
        if (!ourSquadsIds.length) {
          index = index + 5
          continue
        }
        const planEndIndex = squadsIdsAndEnemiesIdsAndRest.findIndex(value => value === -2)
        const enemiesIds = squadsIdsAndEnemiesIdsAndRest.slice(
          ourSquadsIdsEndIndex + 1,
          planEndIndex,
        )
        index = index + 4 + planEndIndex

        ourSquadsIds.forEach(ourSquadId => {
          const squadX = factions[0].squads[ourSquadId].x
          const squadY = factions[0].squads[ourSquadId].y
          const arrowNode = document.createElement('div')
          arrowNode.classList.add('arrow')
          arrowNode.style.left = `${squadX}px`
          arrowNode.style.top = `${squadY}px`
          arrowNode.style.width = `${Math.hypot(squadX - planX, squadY - planY)}px`
          arrowNode.style.transform = `rotate(${(Math.atan2(planX - squadX, squadY - planY) -
            Math.PI / 2) *
            (180 / Math.PI)}deg)`
          lines.push(arrowNode)
          groundNode.appendChild(arrowNode)
        })
      }
    })

    const prevState = localStorage.getItem('ai_debug')

    if (prevState) {
      JSON.parse(prevState).forEach(({ id, color, complementaryColor, squads }) => {
        const createSquad = createNewFaction(id, color, complementaryColor)
        squads.map(({ isPortal, x, y, id }) => {
          createSquad(isPortal, x, y, id)
        })
      })
    }

    window.addEventListener('beforeunload', () => {
      localStorage.setItem('ai_debug', JSON.stringify(factions))
    })
  }
}

export const stopDebug = () => {
  const debugPanelNode = document.querySelector<HTMLDivElement>('#debug-panel')
  const addFactionBtnNode = document.querySelector<HTMLButtonElement>('#add-faction')
  const makeIterationBtnNode = document.querySelector<HTMLButtonElement>('#make-iteration')
  const groundNode = document.querySelector<HTMLButtonElement>('.ground')

  debugPanelNode.removeChild(addFactionBtnNode)
  document.body.removeChild(groundNode)
  debugPanelNode.removeChild(makeIterationBtnNode)
  window.debugAiMode = false
}
