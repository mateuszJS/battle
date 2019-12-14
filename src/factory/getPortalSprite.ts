import EffectFactory from '~/effects//EffectsFactory';

const portalProperties = [
  {
    portalEffect: { x: 5, y: 90, width: 100, height: 300, skewY: 0 },
    gateTop: { x: 9, y: 118, anchorY: 1.2 },
    gateBottom: { x: 0, y: 88, anchorY: 0.9 },
  },
  {
    portalEffect: { x: 7, y: 45, width: 220, height: 220, skewY: 0.5 },
    gateTop: { x: 28, y: 68, anchorY: 0.9 },
    gateBottom: { x: -30, y: -37, anchorY: 0.55 },
  },
  {
    portalEffect: { x: -5, y: 10, width: 280, height: 180, skewY: 0 },
    gateTop: { x: 5, y: 51, anchorY: 2 },
    gateBottom: { x: 5, y: 5, anchorY: 0.9 },
  },
  {
    portalEffect: { x: -10, y: 40, width: 220, height: 220, skewY: -0.5 },
    gateTop: { x: -18, y: 66, anchorY: 0.9 },
    gateBottom: { x: 28, y: -48, anchorY: 0.6 },
  },
]

const getPortalSprite = (x, y, angle, sortingLayer: PIXI.display.Group): PIXI.Container => {
  angle -= Math.PI / 8;// + Math.PI / 2;
  // angle *=
  angle = angle < 0 ? angle + Math.PI * 2 : (angle > Math.PI * 2 ? angle - Math.PI * 2 : angle);
  const _angle = Math.ceil((angle % (Math.PI * 2)) / ((Math.PI * 2) / 8)); // <0, 7>
  let index = _angle % (8 / 2);
  if (index === 1) {
    index = 3;
  } else if (index === 3) {
    index = 1;
  }
  const gateBottom: any = new PIXI.Sprite(PIXI.Texture.from(`gate${index}a.png`));
  const gateTop: any = new PIXI.Sprite(PIXI.Texture.from(`gate${index}b.png`));

  const props = portalProperties[index];

  gateTop.x = props.gateTop.x;
  gateTop.y = props.gateTop.y;
  gateBottom.x = props.gateBottom.x;
  gateBottom.y = props.gateBottom.y;



  const portalFX: any = EffectFactory.createPortalEffect(props.portalEffect.x, props.portalEffect.y);

  portalFX.height = props.portalEffect.height;
  portalFX.width = props.portalEffect.width;
  portalFX.skew.set(0, props.portalEffect.skewY);

  gateTop.anchor.set(0.5, props.gateTop.anchorY);
  gateBottom.anchor.set(0.5, props.gateBottom.anchorY);

  gateBottom.parentGroup = sortingLayer;
  portalFX.parentGroup = sortingLayer;
  gateTop.parentGroup = sortingLayer;

  window.app.stage.addChild(gateBottom);
  window.app.stage.addChild(portalFX);
  window.app.stage.addChild(gateTop);

  portalFX.alpha = 0.9;

  [gateBottom, portalFX, gateTop].map(child => {
    child.x += x;
    child.y += y;
  });

  return portalFX;
}



export default getPortalSprite;

