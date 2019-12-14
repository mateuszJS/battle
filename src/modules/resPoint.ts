import Utils from 'Utils';

class ResPoint {
  public x: number
  public y: number
  public owner: number
  private graphics: any
  private progressLine: PIXI.Graphics
  private radius: number
  private progress: number

  constructor(x: number, y: number, sortingLayer: PIXI.display.Group) {
    this.graphics = new PIXI.Sprite(window.app.loader.resources['assets/map_center.png'].texture);
    this.graphics.anchor.set(0.5, 0);
    this.graphics.scale.set(0.3, 0.24);
    this.graphics.x = x;
    this.graphics.y = y - this.graphics.height / 2;

    this.graphics.parentGroup = sortingLayer;

    const progressBar = new PIXI.Container();
    window.app.stage.addChild(progressBar);

    this.progressLine = new PIXI.Graphics();
    this.progressLine.beginFill(0xCCCCCC);
    this.progressLine.drawRect(0, 0, 100, 20);
    this.progressLine.y = y - 10;
    this.progressLine.x = x - 50;
    this.progressLine.width = 0;
    this.progressLine.alpha = 0.75;

    const progressBorder = new PIXI.Graphics();
    progressBorder.lineStyle(2, 0x888888, 1);
    progressBorder.drawRect(x - 50, y - 10, 100, 20);

    progressBar.addChild(this.progressLine, progressBorder);
    window.app.stage.addChild(this.graphics, progressBar);
    // graphics.

    this.owner = -1;
    this.radius = this.graphics.width / 2;
    this.progress = 0;
    this.x = x;
    this.y = y;
  }

  update() {
    const allNearSquads: number[] = [];
    window.allSquads.forEach((fact, idx) => {
      if (idx !== this.owner) {
        fact.forEach(squad => {
          if (Utils.dis(squad.center, this) < this.radius) {
            allNearSquads.push(idx);
          }
        })
      }
    });

    if (allNearSquads.length === 0) {
      if (this.progress < 100 && this.progress > 0) {
        this.owner === -1 ? this.progress-- : this.progress++;
        this.progressLine.width = this.progress;
        if (this.progress === 0) {
          this.graphics.tint = 0xFFFFFF;
          this.owner = -1;
        }
      }
      return;
    }

    const faction = allNearSquads.reduce((result, fact) =>
      result !== fact ? -1 : result, allNearSquads[0]);

    if (faction !== -1) {
      if (this.owner === -1) {
        this.progress++;
        this.progressLine.width = this.progress;

        if (this.progress === 100) {
          this.owner = faction;
          this.graphics.tint = faction === 0 ? 0xAAAAFF : 0xFFAAAA;
        }
      } else {
        this.progress--;
        this.progressLine.width = this.progress;
        if (this.progress === 0) {
          this.owner = -1;
          this.graphics.tint = 0xFFFFFF;
        }
      }
    }
  }
}

export default ResPoint;