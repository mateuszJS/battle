let testElbows = null

const debug = () => {
  if (!testElbows) {
    testElbows = new PIXI.Graphics()
    window.app.stage.addChild(testElbows)
  }

  const correct = []
  const incorrect = []

  const doElbow = (points: Array<{ x: number; y: number }>) => {
    const pointA = points[0]
    const pointB = points[1]
    const pointC = points[2]
    testElbows.lineStyle(2, 0x8888ff, 1)
    testElbows.moveTo(pointA.x, pointA.y)
    testElbows.lineTo(pointB.x, pointB.y)
    testElbows.lineTo(pointC.x, pointC.y)
    testElbows.endFill()

    // calc elbow

    const angleBToA = Math.atan2(pointA.x - pointB.x, pointB.y - pointA.y)
    const angleBToC = Math.atan2(pointC.x - pointB.x, pointB.y - pointC.y)

    const inAdirection = {
      x: Math.sin(angleBToA) * 20,
      y: -Math.cos(angleBToA) * 20,
    }

    testElbows.beginFill(0x000000, 1)
    testElbows.lineStyle(0)
    testElbows.drawCircle(
      inAdirection.x - 2.5 + pointB.x,
      inAdirection.y - 2.5 + pointB.y,
      5,
    )
    testElbows.endFill()

    const inCdirection = {
      x: Math.sin(angleBToC) * 20,
      y: -Math.cos(angleBToC) * 20,
    }

    testElbows.beginFill(0x000000, 1)
    testElbows.lineStyle(0)
    testElbows.drawCircle(
      inCdirection.x - 2.5 + pointB.x,
      inCdirection.y - 2.5 + pointB.y,
      5,
    )
    testElbows.endFill()
    const centerPoint = {
      x: (inAdirection.x + inCdirection.x) / 2 + pointB.x,
      y: (inAdirection.y + inCdirection.y) / 2 + pointB.y,
    }
    const angleCenterToB = Math.atan2(
      pointB.x - centerPoint.x,
      centerPoint.y - pointB.y,
    )

    const finalPoint = {
      x: Math.sin(angleCenterToB) * 50 + pointB.x,
      y: -Math.cos(angleCenterToB) * 50 + pointB.y,
    }

    testElbows.beginFill(0xffff00, 1)
    testElbows.lineStyle(0)
    testElbows.drawCircle(finalPoint.x - 2.5, finalPoint.y - 2.5, 5)
    testElbows.endFill()

    let finalAngle = (angleBToA + angleBToC) / 2 // + Math.PI
    const anglesDiff = angleBToA - angleBToC
    if (
      anglesDiff > 0
      // anglesDiff > 0 &&
      // (finalAngle % (Math.PI / 2) !== 0 ||
      //   (anglesDiff < 0 && anglesDiff <= -(Math.PI / 2)))
    ) {
      finalAngle += Math.PI
    }
    // https://rosettacode.org/wiki/Averages/Mean_angle#JavaScript
    finalAngle = Math.atan2(
      (Math.sin(angleBToA) + Math.sin(angleBToC)) / 2,
      (Math.cos(angleBToA) + Math.cos(angleBToC)) / 2,
    )
    // )
    // }
    // finalAngle = meanAngleDeg([angleBToA, angleBToC])
    // angleA - angleB === 0, and angleA less than Math.PI

    // var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));
    // var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2));
    // var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
    // return Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));

    /* =======================this one WORKS!=========================*/
    // let Distance, Bisect
    // if (Math.abs(angleBToA - angleBToC) < Math.PI) {
    //   Distance = Math.abs(angleBToA - angleBToC)
    //   if (angleBToA < angleBToC) {
    //     Bisect = angleBToA + Distance / 2
    //   } else {
    //     Bisect = angleBToC + Distance / 2
    //   }
    // } else {
    //   Distance = Math.PI * 2 - Math.abs(angleBToA - angleBToC)
    //   if (angleBToA < angleBToC) {
    //     Bisect = angleBToA - Distance / 2
    //   } else {
    //     Bisect = angleBToC - Distance / 2
    //   }
    // }
    // finalAngle = Bisect
    /*=======================this one WORKS!=========================*/

    const finalX = Math.sin(finalAngle) * 30 + pointB.x
    const finalY = -Math.cos(finalAngle) * 30 + pointB.y
    // const object = {
    //   finalAngle,
    //   angleBToA,
    //   angleBToC,
    //   pointBx: pointB.x,
    //   pointBy: pointB.y,
    // }
    // const object = `${finalAngle.toFixed(2)} ${}`
    const object = `${finalAngle} ${angleBToA} ${angleBToC}`
    if (Math.hypot(finalX - finalPoint.x, finalY - finalPoint.y) < 40) {
      correct.push(object)
    } else {
      incorrect.push(object)
    }

    testElbows.beginFill(0xff0000, 1)
    testElbows.lineStyle(0)
    testElbows.drawCircle(finalX - 2.5, finalY - 2.5, 5)
    testElbows.endFill()
  }

  doElbow([
    {
      x: 800,
      y: 200,
    },
    {
      x: 850,
      y: 150,
    },
    {
      x: 900,
      y: 200,
    },
  ])

  doElbow([
    {
      x: 800,
      y: 200,
    },
    {
      x: 900,
      y: 250,
    },
    {
      x: 800,
      y: 300,
    },
  ])
  doElbow([
    {
      x: 800,
      y: 300,
    },
    {
      x: 850,
      y: 350,
    },
    {
      x: 900,
      y: 300,
    },
  ])
  doElbow([
    {
      x: 800,
      y: 200,
    },
    {
      x: 700,
      y: 250,
    },
    {
      x: 800,
      y: 300,
    },
  ])

  const factor = 3.5
  for (let i = 0; i < 2 * Math.PI; i += factor) {
    doElbow([
      {
        x: Math.sin(i - factor) * 150 + 800,
        y: -Math.cos(i - factor) * 150 + 250,
      },
      {
        x: Math.sin(i) * 150 + 800,
        y: -Math.cos(i) * 150 + 250,
      },
      {
        x: Math.sin(i + factor) * 150 + 800,
        y: -Math.cos(i + factor) * 150 + 250,
      },
    ])
  }
}

export default debug
