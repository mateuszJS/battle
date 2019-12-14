import throttle from './throttle';
import Squad from '~/units/Squad';
import Utils from 'Utils';
import setDestinationPoint from '~/modules/setDestination';
import setAbility from '~/abilities/setAbilitie';
import WeaponsFactory  from '~/weapons/WeaponsFactory';
import SETTINGS from 'Settings';
import Icons from '~/modules/icons';
import Unit from '~/units/Unit';

const MOUSE_LEFT_BUTTON = 1;
const MOUSE_RIGHT_BUTTON = 3;
const MOUSE_CLICK_TOLERANCE = 20;
const USER_FACTION = 0;

interface ISelectedAbility {
	squads?: Squad[]
	ability?: string
}

const getUserUnits = () => {
  return window.allSquads[USER_FACTION].reduce((result, squad) =>
    result.concat(squad.members), [] as Unit[]);
}

const getEnemyUnits = () => {
  return window.allSquads.reduce((result, factionSquads, index) => {
    if (index === USER_FACTION) {
      return result;
    }
    const allFactionUnits = factionSquads.reduce((result, squad) =>
      result.concat(squad.members), [])
    return result.concat(allFactionUnits)
  }, [] as Unit[])
}

export default (function() {

	const ViewPoint: Point = {
		x: 1800,
		y: 0
	}

	const init = () => {//only this one function is public
			window.app.view.addEventListener('mousemove', startSelect);
			window.app.view.addEventListener('mousedown', mouseDown);
			window.app.stage.x = -ViewPoint.x;
			return updateStage;
	}

	
	let modX = 0;
	let modY = 0;

	const startSelectingPoint:Point = { x: 0, y: 0 };
	let selectingRect;

	let selectedAbility: ISelectedAbility;
	
	window.allSelectedUnits = [];
	let selectionWasChanged = true;//when user change selection

	const mouseDown = (e) => {
		const mouse: Point = {
			x: e.clientX + ViewPoint.x,
			y: e.clientY + ViewPoint.y,
		}

		if (window.allSelectedUnits.length > 0) {//When some utis has die, but we still contains reference to this unit
			window.allSelectedUnits = window.allSelectedUnits.filter( unit => unit.hp > 0 )
		}

		startSelectingPoint.x = mouse.x;
		startSelectingPoint.y = mouse.y;

		if(e.which === MOUSE_RIGHT_BUTTON) {
			//test, user chooose opponent unit as a aim?
			if(window.allSelectedUnits.length > 0) {
        selectedAbility = undefined;

        const allEnemyUnits = getEnemyUnits()
        for (let i = 0; i < allEnemyUnits.length; i++) {
          const unit = allEnemyUnits[i];
          if (Utils.dis(startSelectingPoint, unit) <= unit.radius + MOUSE_CLICK_TOLERANCE) {
            const { squad } = unit;
            squad.selectAll();
            setTimeout(() => squad && squad.deselectAll(), 750);
            setDestinationPoint(unit.squad, window.allSelectedUnits, true, false, false);
            return;
          }
        }

				setDestinationPoint({ x: mouse.x, y: mouse.y }, window.allSelectedUnits, false, false, false);
			}
		} else {
			for(let i = 0; i < window.icons.length; i++) {
				const icon = window.icons[i],
					  iconX = icon.graphics.x - (icon.width / 2),
					  iconY = icon.graphics.y,
					  iconWidth = icon.width,
					  { x, y } = mouse;

				if(x > iconX &&
				   x < iconX + iconWidth &&
				   y > iconY &&
				   y < iconY + SETTINGS.ABILITY_ICON_SIZE) {
					const index = Math.floor( (y - iconX) / SETTINGS.ABILITY_ICON_SIZE );
					const { name, time } = icon.squad.abilities[0];
					if(time === 0) {
						const squads = [];
						window.allSquads[0].map((squad: Squad) => {
							if(squad.isAllSelected) {
								const hasAbility = squad.abilities.find( abili =>
									abili.name === name && abili.time === 0);
								if(hasAbility) {
									squads.push(squad);
								}
							}
						});

						selectedAbility = {
							squads,
							ability: name
						}
					}
					selectionWasChanged = false;
					// startSelectingPoint = null;
					window.app.stage.removeChild(selectingRect);
					selectingRect = null;
					window.app.view.addEventListener('mousedown', mouseDown);
					return;
				}
			}


			if(selectedAbility) {
				selectedAbility.squads = selectedAbility.squads
					.filter(squad => squad.members.length > 0);

				if(selectedAbility.squads.length > 0) {
					const aim = { x: mouse.x, y: mouse.y };
					setAbility(selectedAbility.squads, aim, selectedAbility.ability);
				}
				selectedAbility = undefined;
				return;
			}

			Icons.removeAllIcons();

			selectingRect = new PIXI.Graphics();
			window.app.stage.addChild(selectingRect);
			window.app.view.addEventListener('mouseup', stopSelect);
			window.app.view.removeEventListener('mousedown', mouseDown);//=========it's really doesn't improve speed
			window.allSelectedUnits.map(unit =>
				unit.squad.deselectAll()
			);
			window.allSelectedUnits = [];
		}
	}


	function stopSelect(e) {
		const mouse: Point = {
			x: e.clientX + ViewPoint.x,
			y: e.clientY + ViewPoint.y,
		}
		
    if(selectingRect && selectingRect.width < MOUSE_CLICK_TOLERANCE) {//it's mean, user click, not create selection
      const userUnits = getUserUnits()
      let i = userUnits.length;

			while (i--) {
				const unit = userUnits[i];
				
				if (Utils.dis(unit, mouse) < unit.radius + MOUSE_CLICK_TOLERANCE) {
					if (!unit.selected) {//we realyl need this conditional???
						window.allSelectedUnits.push(unit);
					}
					unit.selected = true;
					selectionWasChanged = true;
					break;
				}
			}
		}
		if(selectionWasChanged) {
			let selectSquads = window.allSelectedUnits.map(unit => {
				if(unit.squad && !unit.squad.isAllSelected) {
					unit.squad.selectAll();
					return unit.squad;
				}
			});
			selectSquads = selectSquads.filter(squad => squad);

			window.allSelectedUnits = [];
			for(let i = 0; i < selectSquads.length; i++) {
				selectSquads[i].members.map(unit => window.allSelectedUnits.push(unit));
			}
		}

		selectionWasChanged = false;
		// startSelectingPoint = null;
		window.app.stage.removeChild(selectingRect);
		selectingRect = null;
		window.app.view.addEventListener('mousedown', mouseDown);
	}


	const startSelect = throttle((e) => {
		if(selectingRect) {
			const mouse: Point = {
				x: e.clientX + ViewPoint.x,
				y: e.clientY + ViewPoint.y,
			}

			selectionWasChanged = true;
			selectingRect.clear();
			selectingRect.beginFill(0x00FF00, 0.1);
			selectingRect.lineStyle(3, 0x00FF00);
			selectingRect.drawRect(startSelectingPoint.x,
									startSelectingPoint.y, 
									mouse.x - startSelectingPoint.x,
									mouse.y - startSelectingPoint.y);

			let minX,maxX,minY,maxY;

			if(startSelectingPoint.x < mouse.x){
				minX = startSelectingPoint.x;
				maxX = mouse.x;
			} else {
				maxX = startSelectingPoint.x;
				minX = mouse.x;
			}

			if(startSelectingPoint.y < mouse.y){
				minY = startSelectingPoint.y;
				maxY = mouse.y;
			} else {
				maxY = startSelectingPoint.y;
				minY = mouse.y;
			}

      const userUnits = getUserUnits()
      let i = userUnits.length;

			while(i--) {
				const unit = userUnits[i];
				if(unit.x > minX
				&& unit.x < maxX
				&& unit.y > minY
				&& unit.y < maxY){
					if(!unit.selected) {
						window.allSelectedUnits.push(unit);
					}
					unit.selected = true;
					unit.draw();
				} else if(unit.selected) {
					unit.selected = false;
					unit.draw();
					window.allSelectedUnits.splice(window.allSelectedUnits.indexOf(unit), 1);
				}
			}
		} else {
			modX = 0;
			modY = 0;
			if(e.clientX < 50
			|| e.clientX > window.innerWidth - 50
			|| e.clientY < 50
			|| e.clientY > window.innerHeight - 50) {
				modX = (e.clientX - (window.innerWidth / 2)) / 100;
				modY = (e.clientY - (window.innerHeight / 2)) / 100;
			}
		}
	}, 30);


	function updateStage() {
	
		if(modX !== 0 && ViewPoint.x + modX >= 0 && ViewPoint.x + modX <= window.mapWidth - window.innerWidth) {
			ViewPoint.x += modX;
			window.app.stage.x = -ViewPoint.x;
		}

		if(modY !== 0 && ViewPoint.y + modY >= 0 && ViewPoint.y + modY <= window.mapHeight - window.innerHeight) {
			ViewPoint.y += modY;
			window.app.stage.y = -ViewPoint.y;
		}
		
	}

	// function testPlaceIsFree(point, radius) {
	// 	let quantity = 0;
	// 	window.allUnits.map(unit => {
	// 		if(unit.aim) {//gdy ma cel do którego idzie, to sprawdż, czy ten cel nie koliduje z "point"
	// 			if(window.dis(unit.aim, point) < radius) quantity++;
	// 		} else {//gdy nie ma celu podróży, to wtedy sprawdź obecną pozycje
	// 			if(window.dis(unit, point) < radius) quantity++;
	// 		}
			
	// 	});
	// 	return quantity < 5;
	// }





	return init
})();