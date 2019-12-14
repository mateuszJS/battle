import STATE from '../modules/consts';
import Utils from 'Utils';
import SETTINGS from 'Settings';

function getAngle(unitAngle) {
    let angle = unitAngle * (180 / Math.PI);
    if(angle >= 360) {
        angle -= 360;
    } if(angle < 0) {
        angle += 360;
    }

    angle = 360 - angle - 90;
    if(angle < 0) {
        angle += 360;
    }
    return angle;
}

// function checkFrame(stateToChecked) {
//     switch(stateToChecked) {
//         case STATE.GO: {
//             if(movieClip.currentFrame >= 72 + 12 && 11 * 16 + 72 + 12 + 15 >= movieClip.currentFrame) {
//                 return true;
//             }
//         }
//         case STATE.SHOOT: {
//             if(movieClip.currentFrame >= 72 + 12 && 11 * 16 + 72 + 12 + 15 >= movieClip.currentFrame) {
//                 return true;
//             }
//         }
//         case STATE.STAY: {
//             if(movieClip.currentFrame >= 72 + 12 && 11 * 16 + 72 + 12 + 15 >= movieClip.currentFrame) {
//                 return true;
//             }
//         }
//     }
//     return false;
// }

function getRotationFrame() {
    const angle = this.getAngle(this.angle);
    for(let i = 0; i < 12; i++) {
        if(angle <= this.model.angles[i]) return i;
    }
    return 0;//first frame
}

function getRotationFrameSmall() {
    const angle = this.getAngle(this.angle);
    for(let i = 0; i < 8; i++) {
        if(angle <= i * 45 + 22) return i;
    }
    return 0;//first frame
}

function goToShootFrame() {
    const { framesPeriods } = this.model; 
    const frameId = this.getRotationFrame() * framesPeriods.SHOOT.length + framesPeriods.SHOOT.first;//12 - index of first frame, 5 - length of one animation loop
    const movieClip = this.graphics.getChildAt(1);
    movieClip.gotoAndPlay(frameId); 
}

// function goToMeleeFrame() {
//     const { framesPeriods } = this.model;
//     const frameId = this.getRotationFrameSmall() * framesPeriods.SHOOT.length + framesPeriods.SHOOT.first;//12 - index of first frame, 5 - length of one animation loop
//     const movieClip = this.graphics.getChildAt(1);
//     movieClip.animationSpeed = 0.3; 
//     movieClip.gotoAndPlay(frameId); 
// }

function afterGetup() {
  if (this.aim) {
    if ('hp' in this.aim) {
      this.searchAimToAttack()
    } else {
      if (Utils.dis(this, this.aim) <= this.speed * SETTINGS.CHANGE_STATE_THROTTLE) {//we should increase tolerance
        this.aim = undefined
        this.ability = undefined
        this.searchAimToAttack()
      } else {
        this.changeStateToGo(this.aim)
      }
    }
  } else {
    this.searchAimToAttack()
  }
}

function draw() {
    // if(this.attackAim) console.log(this.getAngle());
    const movieClip = this.graphics.getChildAt(1);
    const { framesPeriods } = this.model;

    switch(this.state) {
        case STATE.STAY: {
            const frameId = this.getRotationFrame();
            if(movieClip.currentFrame !== frameId) {
                movieClip.gotoAndStop(frameId);
            }
            break;
        }
        case STATE.SHOOT: {
            const frameId = this.getRotationFrame() * framesPeriods.SHOOT.length + framesPeriods.SHOOT.first;//12 - index of first frame, 5 - length of one animation loop
            if(movieClip.currentFrame < frameId || movieClip.currentFrame > frameId + (framesPeriods.SHOOT.length - 1)) {
                movieClip.gotoAndStop(frameId);
            }
            break;
        }
        // case STATE.MELEE: {
        //     const frameId = this.getRotationFrameSmall() * framesPeriods.SHOOT.length + framesPeriods.SHOOT.first;//12 - index of first frame, 5 - length of one animation loop
        //     if(movieClip.currentFrame < frameId || movieClip.currentFrame > frameId + (framesPeriods.SHOOT.length - 1)) {
        //         // movieClip.animationSpeed = 0.3;                                
        //         movieClip.gotoAndStop(frameId);
        //         // Last frame and speed > 0
        //     } else if(movieClip.currentFrame === frameId + (framesPeriods.SHOOT.length - 1) && movieClip.animationSpeed > 0) {
        //         movieClip.animationSpeed = -0.3;       
        //         movieClip.gotoAndPlay(frameId + (framesPeriods.SHOOT.length - 1));       
        //     }
        //     break;
        // }
        case STATE.GO: {
            const frameId = this.getRotationFrame() * framesPeriods.GO.length + framesPeriods.GO.first;
            // Impossible
            if(movieClip.currentFrame < framesPeriods.GO.first || movieClip.currentFrame > framesPeriods.GO.last) {//other animation than GO
                const random = Math.floor(Utils.randomAbsLUT(14));
                movieClip.gotoAndPlay(frameId + random);
            } else if(movieClip.currentFrame < frameId || movieClip.currentFrame > frameId + (framesPeriods.GO.length - 1)) {    
                movieClip.gotoAndPlay(frameId);
                //but when getRotationFrame was changes, then you start playing from first frame :<
            }
            break;
        }
        case STATE.FLY: {
            const frameId = this.getRotationFrameSmall() * framesPeriods.FLY.length + framesPeriods.FLY.first;
            if(movieClip.currentFrame < frameId || movieClip.currentFrame > frameId + (framesPeriods.FLY.length - 1)) {
                movieClip.animationSpeed = 0.3;
                movieClip.gotoAndPlay(frameId);
            } else if(movieClip.currentFrame >= frameId + (framesPeriods.FLY.length - 1)) {
                movieClip.gotoAndStop(frameId + (framesPeriods.FLY.length - 1));
            }
            break;
        }
        case STATE.GETUP: {
            const frameId = this.getRotationFrameSmall() * framesPeriods.GETUP.length + framesPeriods.GETUP.first;
            if(movieClip.currentFrame < frameId || movieClip.currentFrame > frameId + (framesPeriods.GETUP.length - 1)) {
                movieClip.gotoAndPlay(frameId);
            } else if(movieClip.currentFrame >= frameId + (framesPeriods.GETUP.length - 1)) {
                movieClip.animationSpeed = 0.4;
                this.afterGetup();
            }
            break;
        }
        case STATE.DIE: {
            const frameId = this.getRotationFrameSmall() * framesPeriods.FLY.length + framesPeriods.FLY.first;
            if(movieClip.currentFrame < frameId || movieClip.currentFrame > frameId + (framesPeriods.FLY.length - 1)) {
                // movieClip.animationSpeed = -0.3;   
                movieClip.gotoAndPlay(frameId);
            } else if(movieClip.currentFrame >= frameId + (framesPeriods.FLY.length - 1)) {
                this.removeSelf();
                return;
            }
            break;
        }

        case STATE.ABILITY: {
            const frameId = this.getRotationFrame() * framesPeriods.GO.length + framesPeriods.GO.first + 7;// because 7th frame looks the best for it
            if(movieClip.currentFrame !== frameId) {
                movieClip.gotoAndStop(frameId);
            }
            break;
        }
    }


    const selection = this.graphics.getChildAt(0);
    if (this.selected) {
        if (!selection.visible) {
            selection.visible = true;
        }
    } else {
        if (selection.visible) {
            selection.visible = false;
        }
    }

    /*===TEST, RIFLE POINTS===*/
    // this.frame++;
    // if(this.frame % 60 === 0) {
    //     let id = this.frameID * 6 + 12;
    //     id = id % (11 * 7 + 12);
    //     const movieClip = this.graphics.getChildAt(1);
    //     movieClip.gotoAndStop(id);
    //     this.frameID++;
    // }

    // const graphics = new PIXI.Graphics();
    // graphics.beginFill(0xFF0000);
    // for(let i = 0; i < 12; i++) {
	// 		const point = this.model.riflePoints[i];
	// 		const xx = (point.x + 2) * 0.9 + this.x,
    //             yy = (point.y - 16) * 0.9 + this.y;
                
    //     graphics.drawRect(xx, yy, 2, 2);
    // }
    // window.app.stage.addChild(graphics);
    
}

export {
  draw,
  goToShootFrame,
  getRotationFrame,
  getRotationFrameSmall,
  getAngle,
  afterGetup,
};