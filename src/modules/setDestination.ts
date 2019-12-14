import Utils from 'Utils';
import Unit from '~/units/Unit';
import generateArray from '~/modules/generateArray';
import Squad from '~/units/Squad';

const sortUnitByWeapon = (units) => {
    const weapons = [];
    units.map( unit => {
        for(let i = 0; i < weapons.length; i++) {//loop per weapon types
            if(weapons[i][0].weapon.range === unit.weapon.range) {
                weapons[i].push(unit);//weapon of this type already exists in array
                return;//after add weapon to array, leave loop
            }
        }
        weapons.push([ unit ]);//add new type of weapon, and add units to this type
    });
    return weapons;
}

const isMoreThanOneWeaponType = (units: Unit[]): boolean => {
    const firstWeapon = units[0].weapon.range;
    return units.reduce( (prev, curr) =>
        firstWeapon !== curr.weapon.range ? true : prev, false);
}

const setDestinationPoint = (
  destination: Squad | Point,
  units: Unit[],
  attack:boolean,
  oneWeaponType:boolean,
  onePlace:boolean
) => {
    //A CO GDY jednostki które są zaznaczone, mają różny zasięg broni???
    //-rozdzielić na dwie metody, inne pola na którszej broni, inne dla dłuższej, cała funkcja x 2 aż musi iść
    let unitsOutOfRange = [];

    if(attack) {
      if (!('center' in destination)) {
        debugger
        return
      }

      units.forEach((unit) => { // if distance < weapon.range, then unit can stay
        if (Utils.dis(unit, destination.center) < unit.weapon.range) {
          unit.squad.aim = destination
          unit.stay()
        } else {
          unitsOutOfRange.push(unit) // rest of untis needs to find be closer to aim
        }
      })

      if(unitsOutOfRange.length === 0) return; // All units are in range

      // if units are in different group, then firstly they need to create differend groups depending on position
      if(!onePlace) {
          //START TESTING: "Units are in the same place?"
          let allInOneGroup = true;
          const unitsInDifferentPlaces = [[],[],[],[]],//4 arrays, one per kartezjan space
                groupX = units[0].x,//to testing, because maybe all units are in one group
                groupY = units[0].y;//but group is on others space of karetzjian area

          unitsOutOfRange.map(unit => {
              const x = unit.x < destination.center.x ? 1 : 0;
              const y = unit.y > destination.center.y ? 2 : 0;//which kartezjan space
              unitsInDifferentPlaces[x + y].push(unit);

              if(Math.abs(groupX - unit.x) > 200 || Math.abs(groupY - unit.y) > 200) {
                  allInOneGroup = false;//czy wszystkie jednostki sa w jendym miejscu, czyli czy ich odelgosc od pierwszej jendostki jest mniejsza niz 200
              }
          });

          if(!allInOneGroup) {
              let countOther = 0;//test, is more than one kartezjan space
              unitsInDifferentPlaces.map( place => {
                  if(place.length) {
                      countOther++;
                  }
              })

              if(countOther > 1) {//is more than one kartezjan space
                  unitsInDifferentPlaces.map(place => setDestinationPoint(destination, place, true, false, true));
                  return;
              }
          }
          //END TESTING: "Units are in the same place?"
      }


      if(!oneWeaponType) {
          const moreTypes = isMoreThanOneWeaponType(unitsOutOfRange);//it's more than one type of weapon, return boolean
          if(moreTypes) {
              const weapons = sortUnitByWeapon(unitsOutOfRange);//sort untis by weapon's range, return array
              weapons.map(unitsKind =>
                  setDestinationPoint(destination, unitsKind, true, true, true));
              return;
          }
      }
      
    } else {//if attack == false
        unitsOutOfRange = units.slice();
        // unitsOutOfRange.map(unit => {
        // 	unit.setTargetToGo();	
        // });
        //because on bottom we set undefiend when attack is false
    }

    const unitsCenter = Utils.calculateCenterPoint(unitsOutOfRange)
    const mainAngle = Utils.ang(
      unitsCenter,
      ('center' in destination ? destination.center : destination)
    )
    const positionData = generateArray(unitsOutOfRange.length)

    let offsetX = unitsCenter.x - ('center' in destination ? destination.center.x : destination.x)
    let offsetY = unitsCenter.y - ('center' in destination ? destination.center.y : destination.y)

    positionData.points.map(point => {
        const startPoint: Point = {x: 0, y: 0},
              dis = Utils.dis(startPoint, point),
              ang = Utils.ang(startPoint, point);
        point.x = Math.sin(mainAngle + ang) * dis + unitsCenter.x;
        point.y = -Math.cos(mainAngle + ang) * dis + unitsCenter.y;
    });

    // Now we have made full array which contain new positions

    const unitsWithoutPoint = unitsOutOfRange.slice();
    const sortUnitsArray = (a ,b) => {
        const aDistance = Utils.dis(a, unitsCenter),
              bDistance = Utils.dis(b, unitsCenter);
        if(aDistance > bDistance) return -1;
        else if(aDistance < bDistance) return 1;
        return 0;
    }
    unitsWithoutPoint.sort(sortUnitsArray);
    
    //let y = positionData.points.length - (positionData.points.length % positionData.cols) - 1;
    //index brzegowego pointu


    if(attack) {
        if (!('center' in destination)) {
          debugger
          return
        }
        const d = Math.sqrt(Math.pow(unitsWithoutPoint[0].weapon.range,2) - Math.pow(positionData.width/2, 2)) - positionData.height/2;
        let newPointX = Math.sin(mainAngle) * -d + destination.center.x
        let newPointY = -Math.cos(mainAngle) * -d + destination.center.y

            //-----------===========WYRZUCENIE TESU, CZY MIEJSCE JEST WOLNE===============--------------//
        // if(!testPlaceIsFree({x: newPointX, y: newPointY}, positionData.height/2)) {

        // 	let changeAngle = window.dis(destination, {x: newPointX, y: newPointY}) / positionData.height/2;

        // 	newPointY = Math.sin(mainAngle + changeAngle) * -d + destination.x;
        // 	newPointY = -Math.cos(mainAngle + changeAngle) * -d + destination.y;

        // 	if(!testPlaceIsFree({x: newPointX, y: newPointY}, positionData.height/2)) {
        // 		newPointY = Math.sin(mainAngle - changeAngle) * -d + destination.x;
        // 		newPointY = -Math.cos(mainAngle - changeAngle) * -d + destination.y;
        // 	}

        // }
        offsetX = -newPointX + unitsCenter.x,
        offsetY = -newPointY + unitsCenter.y;
    }


    // Make sure that all points are in map boundary

        // const inBoundary = (point: Point) => {
        //     const diffX = point.x - offsetX;
        //     if(diffX <= 0)
        //         offsetX += diffX - 0;
        //     else if(diffX >= window.mapWidth - 0)
        //         offsetX += diffX - window.mapWidth + 0;
    
        //     const diffY = point.y - offsetY;
        //     if(diffY <= 0)
        //         offsetY += diffY - 0;
        //     else if(diffY >= window.mapHeight - 0)
        //         offsetY += diffY - window.mapHeight + 0;
        // }

    const safeFactor = 20;// 15 shoudl be okay, but for fell more safe :p
    // its caused by generate array has every second row shifted by 15
    const inBoundary = (point: Point) => {
        if(point.x - offsetX <= safeFactor) {
            offsetX -= -(point.x - offsetX) + safeFactor;
        } else if(point.x - offsetX >= window.mapWidth - safeFactor) {
            offsetX += (point.x - offsetX) - window.mapWidth + safeFactor;
        }
        if(point.y - offsetY <= safeFactor) {
            offsetY -= -(point.y - offsetY) + safeFactor;
        } else if(point.y - offsetY >= window.mapHeight - safeFactor) {
            offsetY += (point.y - offsetY) - window.mapHeight + safeFactor;
        }
    }
    if(!positionData.points[0]) debugger;
    inBoundary(positionData.points[0]);
    inBoundary(positionData.points[positionData.cols - 1]);
    if(positionData.points.length === positionData.cols * positionData.rows) {
        inBoundary(positionData.points[positionData.points.length - positionData.cols]);
        inBoundary(positionData.points[positionData.points.length - 1]);
    } else {
        const rest = positionData.points.length % positionData.cols;
        inBoundary(positionData.points[positionData.points.length - rest]);
        inBoundary(positionData.points[positionData.points.length - rest - 1]);
    }


    // console.log(positionData.points, offsetX, offsetY);
    // debugger;

    //iterowanie po punktach, gdy punktów moze byc wiecej niz jednostek daje efekt
    //bajzlu na planszy
    positionData.points.forEach(point => {//obliczamy odległsoc punktów od jednostek
        const index = Utils.getIndexOfTheNearestItem(unitsWithoutPoint, point)
        point.x -= offsetX
        point.y -= offsetY
        const aimToAttack = attack ? destination : undefined
        unitsWithoutPoint[index].squad.aim = aimToAttack
        unitsWithoutPoint[index].setTargetToGo(point)
        unitsWithoutPoint.splice(index, 1)
    });
}

export default setDestinationPoint;