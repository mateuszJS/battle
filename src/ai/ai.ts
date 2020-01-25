import influenceController, {mapUnit} from './influenceMap';
import setDestination from '~/modules/setDestination';
import Squad from '~/units/Squad';
import Utils from 'Utils';
import Unit from '~/units/Unit';
import setAbility from '~/abilities/setAbilitie';
import { STATE } from 'Consts';

interface IArmy {
  squads: Squad[]
  index: number
}

interface IPlace {
  value: number
  point: Point
}

interface IAttack {
  value: number
  squad?: Squad
}

interface IAbilityHistory {
  type: string,
  x: number,
  y: number,
  range: number,
  timer: number
}

interface IAiController {
    abilityHistory: IAbilityHistory[][]

    manageFaction: (factionID: number, maps: mapUnit[][], resPoints: any[], factory: any) => void
    runToSafePlace: (ourInfluenceMap: mapUnit[], army: IArmy, factory: any) => void
    chooseAttackAim: (factionID: number, squads: Squad[], ourVulnerabilityMap: mapUnit[]) => void

    groupSquadIntoArmy: (map: number) => IArmy[]
    getAllSquadsAroundPoint: (point: Point, squads: Squad[]) => Squad[]
}

const AiController: IAiController = {
    abilityHistory: undefined, // Arrays is created in app.ts
    manageFaction(factionID, maps, resPoints, factory) {

        this.abilityHistory[factionID] = this.abilityHistory[factionID].filter(ability => --ability.timer > 0);
        // Remove old history

        const ourInfluenceMap = influenceController.deepCopyMap(maps[factionID]);//maybe we won't need a copy
        const ourTensionMap = influenceController.deepCopyMap(maps[factionID]);//maybe we won't need a copy

        for(let i = 0; i < maps.length; i++) {
            if(i !== factionID) {
                maps[i].forEach((cell, index) => {
                    ourInfluenceMap[index].value -= cell.value;
                    ourTensionMap[index].value += cell.value;
                });
            }
        }

        let ourVulnerabilityMap = influenceController.createOneDimensionArr();
        ourVulnerabilityMap = ourVulnerabilityMap.map((cell, index) => {
            return { value: ourTensionMap[index].value - Math.abs(ourInfluenceMap[index].value), squads: undefined };
        });

        resPoints.forEach(resPoint => {
            if(resPoint.owner !== factionID) {
                const pointIdx = influenceController.getCellIndex(resPoint);
                influenceController.propagation(pointIdx, 500, 100, ourVulnerabilityMap);
            }
        })
        // console.log(ourVulnerabilityMap);
        const ourArmies: IArmy[] = this.groupSquadIntoArmy(factionID);
        
        if(factionID === 1 && window.map) {
            influenceController.drawMap(ourInfluenceMap);
        }

        ourArmies.forEach(army => {//we canuse only x, and y, no row and col
            const { value } = ourInfluenceMap[army.index];
            if(value <= 0) {
                // Throw grenade then run
                this.runToSafePlace(ourInfluenceMap, army, factory);
                return;
            }

            army.squads.forEach((squad: Squad) => {
                if (squad.aim && squad.aim.members.length > 0) {
                  const attackAimIndex = Utils.getIndexOfTheNearestItem(squad.aim.members, squad.members[0]);
                  const attackAim = squad.aim.members[attackAimIndex];

                  const enemyIndex = influenceController.getCellIndex(attackAim);
                  const inOpponentPlace = ourInfluenceMap[enemyIndex].value < 0;
                  const predictableAim = {
                      x: attackAim.x + attackAim.modX * 50,
                      y: attackAim.y + attackAim.modY * 50,
                  }
                  const isSafePlace = this.abilityHistory[factionID].reduce((result, ability) => {
                      if(Utils.dis(ability, predictableAim) < ability.range) {
                          return false;
                      }
                      return result;
                  }, true);
                  // isSafePlace but FOR ENEMY, NOT OUR SAFE PLACE!!!
                  if(attackAim.hp > 0 && inOpponentPlace && isSafePlace) {
                      squad.abilities.map(abili => {
                          if(abili.time === 0) {
                              this.abilityHistory[factionID].push({
                                  type: abili.name,
                                  x: predictableAim.x,
                                  y: predictableAim.y,
                                  range: 100,
                                  timer: 4 // 1 ~ 1.2sec
                              });
                              setAbility([squad], predictableAim, abili.name);
                          }
                      });
                  }

                }
            });


            // freeSquads means without task/priority
            const freeSquads = army.squads.filter(squad =>
                !squad.aim && !squad.members[0].ability);
            if(freeSquads.length > 0) {
                this.chooseAttackAim(factionID, freeSquads, ourVulnerabilityMap);
            }
            
        });
    },


    runToSafePlace(ourInfluenceMap, army, factory) {
        const armyPos = influenceController.getCellPos(army.index);
        const safestPlace: IPlace = {
            value: 1000 / ((Utils.dis(factory, armyPos) / army.squads[0].members[0].speed) * 0.25),
            point: {x: factory.x, y: factory.y}
        }

        ourInfluenceMap.map((cell, index) => {
            const cellPos = influenceController.getCellPos(index);
            const time = Utils.dis(cellPos, armyPos) / army.squads[0].members[0].speed;
            const factor = time * 0.25;

            if(cell.value / factor > safestPlace.value) {
                safestPlace.value = cell.value / factor;
                safestPlace.point = cellPos;
            }

        });
        const units: Unit[] = [];
        army.squads.map(squad => units.push(...squad.members));
        setDestination(safestPlace.point, units, false, false, false);
    },

    chooseAttackAim(factionID, ourSquads, ourVulnerabilityMap) {
        const { center } = ourSquads[0];
        const units: Unit[] = [];
        ourSquads.map(squad => units.push(...squad.members));

        let stillFree = true;
        let minDistance = Number.MAX_SAFE_INTEGER;
        window.allSquads.map((faction, factionIndex) => {
            if(factionIndex === factionID) return;
            faction.map(enemySquad => {
                const distance = Utils.dis(center, enemySquad.center);
                if(distance < 600 && distance < minDistance) {
                    minDistance = distance;
                    setDestination(enemySquad, units, true, false, false);
                    stillFree = false;
                }
            });
        });
        if(!stillFree) return;

        const aimPlace: IPlace = {
            value: Number.MIN_SAFE_INTEGER,
            point: {x: 0, y: 0}
        }

        ourVulnerabilityMap.map((cell, index) => {

            const cellPos = influenceController.getCellPos(index);
            const time = Utils.dis(cellPos, center) / ourSquads[0].members[0].speed;
            const factor = time * 0.25;

            if(cell.value / factor > aimPlace.value) {
                aimPlace.value = cell.value / factor;
                aimPlace.point = cellPos;
            }

        });

        if(aimPlace.value > 0) {
            setDestination(aimPlace.point, units, false, false, false);
        }

        // const placeToAttack: IAttack = {
        //     value: Number.MAX_SAFE_INTEGER,
        //     squad: undefined
        // }

        // if(placeToAttack.squad) {
        //     const units: Unit[] = [];
        //     ourSquads.map(squad => units.push(...squad.members));
        //     const attackAimIndex = Utils.getIndexOfTheNearestItem(placeToAttack.squad.members, center);
        //     setDestination(placeToAttack.squad.members[attackAimIndex], units, true, false, false);
        // }      
    },



    getAllSquadsAroundPoint(point, squadsArr) {
        return squadsArr.reduce((result: Squad[], squad: Squad, index: number) => {
            if(Utils.dis(point, squad.center) < 300) {
                result.push(squad);
                squadsArr.splice(index, 1);
            }
            return result;
        }, [])
    },

    groupSquadIntoArmy(factionID)  {
        const armies: IArmy[] = [];
        const tempSquads = [...window.allSquads[factionID]];
  
        while(tempSquads.length > 0) {
            const squad = tempSquads.splice(0, 1)[0];
            const index = influenceController.getCellIndex(squad.center);
            armies.push({
                squads: [...this.getAllSquadsAroundPoint(squad.center, tempSquads), squad],
                index
            })
        }
        // tempSquads.map((squad, idx)=> {
        //     tempSquads.splice(idx, 1);
        //     const { row, col } = influenceController.getCell(squad);
        //     armies.push({
        //         squads: [...tempSquads.reduce((result, team, index) => {
        //             if(Utils.dis(squad.center, team.center) < 3000) {
        //                 result.push(team);
        //                 tempSquads.splice(index, 1);
        //             }
        //             return result;
        //         }, []), squad],
        //         row,
        //         col
        //     })
        // });


        return armies;
    }
}

export default AiController;