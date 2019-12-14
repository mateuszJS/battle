import * as PIXI from 'pixi.js';
import 'pixi-layers';

import mouseControllerInitialize from '~/modules/mouseController';
import UnitFactory from '~/units/UnitFactory';

import influenceController from '~/ai/influenceMap';
import aiController from '~/ai/ai';
import Icons from '~/modules/icons';

import getSortableLayer from '~/modules/getSortableLayer';

import testIt from './modules/testingFunction';
import createFactories from './createFactories'
import addProductionIcons from './addProductionIcons'
import createSmokeContainer from './createSmokeContainer'
import addBackground from './addBackground'
import render from './render';

window.testIt = testIt;

const setup = (playersList: Array<'HUMANS'>) => {
  const factionsCount = playersList.length;
  const createEmptyArr = () => Array.from({ length: factionsCount }, () => [])

  const sortingLayer = getSortableLayer();
  addBackground();
  UnitFactory.inizializationTypes(sortingLayer);
  influenceController.init(window.mapWidth, window.mapHeight);
  Icons.init();

  window.bulletContainer = []
  window.allSquads = []

  const { factories, resourcesPoints } = createFactories(factionsCount, sortingLayer)

  const updateStage = mouseControllerInitialize()

  aiController.abilityHistory = createEmptyArr();
  window.squadsWereMoved = window.allSquads;

  //we don't need initial value, because in first loop all units
  // use window.allUnits to search targets to attack
  window.hunters = createEmptyArr();
  // Array called "hunters" will contains Arrays, and this Arrays will collects Units

  window.hutningTimer = 0;//if time === 0, manageHunters()
  window.timer = 0;
  window.icons = [];
  window.flamesUpdaters = [];

  const getUnitType = (faction) => {
    if (playersList[faction] === 'HUMANS') {
      return 'SOLIDER_REGULAR';
    } else {
      return 'WARRIOR_ASSAULT';//'WARRIOR_REGULAR';
    }
  }

  window.userIcons = []

  addProductionIcons(playersList, factories)
  createSmokeContainer()

  const resCounter = document.querySelector('#res-counter');
  const updateResCounter = () => {
    let resX = 0;
    const increaseFactor = resourcesPoints.map(rp => {
      if (rp.owner === 0) {
        resX++;
      }
    });
    resCounter.innerHTML = `${factories[0].resources} /+${28 + resX * 7}`;
  }

  window.app.ticker.add((delta: number) => render(
    delta,
    updateStage,
    factories,
    getUnitType,
    updateResCounter,
    createEmptyArr,
    resourcesPoints,
  ));
}

export default setup
