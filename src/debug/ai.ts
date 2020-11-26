import { Universe } from '../../crate/pkg/index'
import { MAP_WIDTH, MAP_HEIGHT } from 'Consts'

const factions = []
const SQUAD_RADIUS = 15

const createNewFaction = () => {
  const debugPanelNode = document.querySelector('#debug-panel') as HTMLDivElement
  const groundNode = document.querySelector('.ground')
  const color = Math.floor(Math.random() * 16777215)

  const faction = {
    id: factions.length,
    color: `#${color.toString(16)}`,
    complementaryColor: `#${(0xffffff ^ Number(color)).toString(16)}`,
    squads: [],
  }
  console.log(faction)
  const addNewSquad = (isPortal: boolean) => {
    const influence = isPortal ? 1.0 : 0.07
    const newSquad = {
      id: faction.id * 1000 + faction.squads.length,
      x: 400,
      y: 400,
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
        ...squads.flatMap(({ id, x, y }) => [id, x + SQUAD_RADIUS, y + SQUAD_RADIUS]),
      ])

      const result = universe.test_ai(new Float32Array(input))
      console.log(result)

      let index = 0 // do not care about first -2
      while (index < result.length) {
        // ai.ts?fd3c:123 Float32Array(5) [-2, -1, 615, 399, -3]
        const isAttack = result[index + 1] > 0
        const planX = result[index + 2]
        const planY = result[index + 3]
        const squadsIdsAndEnemiesIdsAndRest = result.slice(index + 4)
        const ourSquadsIdsEndIndex = squadsIdsAndEnemiesIdsAndRest.findIndex(value => value < -2.5) // should be equal -3
        const ourSquadsIds = squadsIdsAndEnemiesIdsAndRest.slice(0, ourSquadsIdsEndIndex)
        if (!ourSquadsIds.length) {
          index = index + 5
          continue
        }
        const planEndIndex = squadsIdsAndEnemiesIdsAndRest.findIndex(value => value < -1.5) // should be equal -2
        const enemiesIds = squadsIdsAndEnemiesIdsAndRest.slice(
          ourSquadsIdsEndIndex + 1,
          planEndIndex,
        )
        index = index + 4 + planEndIndex
        console.log('ourSquadsIds', ourSquadsIds)
        // [-2, -1, 590, 390, -3]
        ourSquadsIds.forEach(ourSquadId => {
          const squadX = factions[0].squads[ourSquadId].x
          const squadY = factions[0].squads[ourSquadId].y
          const arrowNode = document.createElement('div')
          arrowNode.classList.add('arrow')
          arrowNode.style.left = `${squadX + SQUAD_RADIUS}px`
          arrowNode.style.top = `${squadY + SQUAD_RADIUS}px`
          arrowNode.style.width = `${Math.hypot(squadX - planX, squadY - planY)}px`
          arrowNode.style.transform = `rotate(${(Math.atan2(planX - squadX, squadY - planY) -
            Math.PI / 2) *
            (180 / Math.PI)}deg)`
          lines.push(arrowNode)
          groundNode.appendChild(arrowNode)
        })
      }

      // [
      //   isAttack, x , y,
      //   &plan
      //     .squads_ids
      //     .iter()
      //     .map(|value| *value as f32)
      //     .collect::<Vec<f32>>()[..],
      //   &vec![-3.0][..],
      //   &plan
      //     .enemy_squads
      //     .iter()
      //     .map(|enemy| enemy.upgrade().unwrap().borrow().id as f32)
      //     .collect::<Vec<f32>>()[..],
      // ]
    })

    // -1,
    // portal id, portal x, portal y,
    // squad id, squad x, squad y,
    // squad id, squad x, squad y,
    // squad id, squad x, squad y
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
