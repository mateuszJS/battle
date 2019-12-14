import * as PIXI from 'pixi.js'
window.PIXI = PIXI
import 'pixi-layers'

import { memory } from '../crate/pkg/rust_webpack_bg'
import { method } from '../crate/pkg/rust_webpack'

import testIt from './modules/testingFunction';
import listOfAssets from './listOfAssets'
import setup from './setup';

window.testIt = testIt;
console.log(memory, method(5))

window.startGame = (playersList: Array<'HUMANS'>) => {
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000,
  });
  document.body.appendChild(app.view);
  window.app = app;

  app.loader
    .add(listOfAssets)
    .load(() => setup(playersList))
}
