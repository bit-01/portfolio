export default function () {
  const canvas = document.querySelector('#main')
  const ctx = canvas.getContext('2d')

  function setCanvasSize() {
    canvas.width = canvas.clientWidth * (window.devicePixelRatio || 1)
    canvas.height = canvas.clientHeight * (window.devicePixelRatio || 1)
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1)
  }

  setCanvasSize()

  let canvasHeight = canvas.clientWidth
  let canvasWidth = canvas.clientWidth
  let rotationAngle = 0
  let dotsArray = []

  const TOTAL_DOTS = 3000
  const DOT_SIZE = 6

  let globeRadius = canvasWidth * 3
  let globeCenterZ = -globeRadius
  let canvasCenterX = canvasWidth / 2
  let canvasCenterY = canvasHeight / 2
  let prespectiveDepth = canvasWidth * 0.8

  function createDot(x, y, z) {
    let dot = {
      x,
      y,
      z,
      xProjected: 0,
      yProjected: 0,
      sizeProjected: 0,
    }

    function project(sinAngel, cosAngle) {
      const rotatedX = cosAngle * dot.x + sinAngel * (dot.z - globeCenterZ)
      const rotatedZ = -sinAngel * dot.x + cosAngle * (dot.z - globeCenterZ) + globeCenterZ
      const scaleFactor = prespectiveDepth / (prespectiveDepth - rotatedZ)

      dot.xProjected = rotatedX * scaleFactor + canvasCenterX
      dot.yProjected = dot.y * scaleFactor + canvasCenterY
      dot.sizeProjected = DOT_SIZE * scaleFactor
    }

    function draw(sinAngel, cosAngle) {
      project(sinAngel, cosAngle)
      ctx.beginPath()
      ctx.fillStyle = '#999'
      ctx.arc(dot.xProjected, dot.yProjected, dot.sizeProjected, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fill()
    }

    return {
      project,
      draw,
    }
  }

  function initDots() {
    dotsArray = []

    for (let i = 0; i < TOTAL_DOTS; i++) {
      const THETA = Math.random() * 2 * Math.PI
      const PHI = Math.acos(Math.random() * 2 - 1)

      const X = globeRadius * Math.sin(PHI) * Math.cos(THETA)
      const Y = globeRadius * Math.sin(PHI) * Math.sin(THETA)
      const Z = globeRadius * Math.cos(PHI) + globeCenterZ

      dotsArray.push(createDot(X, Y, Z))
    }
  }

  function renderScene(timestamp) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    rotationAngle = timestamp * 0.000002
    const sinAngel = Math.sin(rotationAngle)
    const cosAngle = Math.cos(rotationAngle)

    dotsArray.forEach((dot) => dot.draw(sinAngel, cosAngle))

    window.requestAnimationFrame(renderScene)
  }

  function onResize() {
    setCanvasSize()
    canvasWidth = canvas.clientWidth
    canvasHeight = canvas.clientHeight
    globeRadius = canvasWidth * 3
    globeCenterZ = -globeRadius
    canvasCenterX = canvasWidth / 2
    canvasCenterY = canvasHeight / 2
    prespectiveDepth = canvasWidth * 0.8

    initDots()
  }

  window.addEventListener('resize', onResize)
  initDots()
  window.requestAnimationFrame(renderScene)
}
