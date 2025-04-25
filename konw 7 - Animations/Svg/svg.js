
const svgNamespace = "http://www.w3.org/2000/svg"

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const margin = 50
const svgProps = {
  margin,
  width: screenWidth - margin * 2,
  height: screenHeight - margin * 2
}
circle_example()
lights_example()

function circle_example() {
  const svgElement = createSVGElement(svgProps.width, svgProps.height, svgProps.margin)
  document.body.appendChild(svgElement)

  const xCenter = svgProps.width / 2
  const yCenter = svgProps.height / 2
  const circle = createSVGAnimatedCircle(xCenter, yCenter, 50, '#000')
  svgElement.appendChild(circle)
}

function lights_example() {
  const svgContainer = createSVGElement(svgProps.width, svgProps.height, svgProps.margin)
  document.body.appendChild(svgContainer)

  for (let offset = 0; offset < 10; offset++) {
    const xOffset = offset * 500
    const yOffset = 0
    const path = createSVGAnimatedPath(svgContainer, xOffset, yOffset, svgProps.width - xOffset, svgProps.height, '#000')
    const path2 = createSVGAnimatedPath(svgContainer, xOffset, svgProps.height, svgProps.width - xOffset, yOffset, '#000')
    animateColor(path, 'stroke')
    animateColor(path2, 'stroke')
  }
}

function createSVGElement(width, height, margin = svgMargin) {
  const svg = document.createElementNS(svgNamespace, 'svg');
  svg.style.width = `${width}px`
  svg.style.height = `${height}px`
  svg.style.margin = `${margin}px`
  svg.style.background = "#ccc"
  return svg
}

function createSVGAnimatedCircle(x, y, radius, color) {
  const circle = document.createElementNS(svgNamespace, 'circle');
  circle.setAttribute('cx', x);
  circle.setAttribute('cy', y);
  circle.setAttribute('r', radius);
  circle.setAttribute('fill', color);

  animateColor(circle)
  return circle
}
function createSVGAnimatedPath(container, startX, startY, endX, endY, color) {
  const path = document.createElementNS(svgNamespace, 'path');
  const startCmd = `M${startX}, ${startY}`
  let x1 = svgProps.width / 2, y1 = svgProps.height / 2, x2 = svgProps.width / 2, y2 = svgProps.height / 2
  let bezierCmd = `C${x1}, ${y1}, ${x2}, ${y2}, ${endX}, ${endY}`
  path.setAttribute('d', `${startCmd} ${bezierCmd}`);
  path.setAttribute('fill', `none`);
  path.setAttribute('stroke', `${color}`);
  path.setAttribute('stroke-width', `2px`);

  container.appendChild(path)

  let step = 2 + Math.random() * 5
  const direction = Math.random() > 0.5 ? 1 : -1
  setInterval(() => step = -step, 3000)
  const animate = function animationLoopCb() {
    x1 += step * direction
    y1 -= step * direction
    x2 -= step * direction
    y2 += step * direction
    let bezierCmd = `C${x1}, ${y1}, ${x2}, ${y2}, ${endX}, ${endY}`
    path.setAttribute('d', `${startCmd} ${bezierCmd}`);
    requestAnimationFrame(animationLoopCb)
  }
  animate()
  return path
}
function animateColor(element, fillOrStroke = 'fill') {
  let randomColor = Math.floor(Math.random() * 255)
  console.log(randomColor)
  let colorR = randomColor
  let colorG = randomColor
  let colorB = randomColor
  let stepR = 1
  let stepG = 1
  let stepB = 1
  const animation = function animationLoopCb() {
    colorR = normalizeRGBValue(colorR + stepR)
    colorG = normalizeRGBValue(colorR + stepG)
    colorB = normalizeRGBValue(colorR + stepB)
    if (colorR >= 255 || colorR <= 0) { stepR = -stepR }
    if (colorG >= 255 || colorG <= 0) { stepG = -stepG }
    if (colorB >= 255 || colorB <= 0) { stepB = -stepB }
    element.setAttribute(fillOrStroke, `rgb(${colorR},${colorG},${colorB})`)
    requestAnimationFrame(animationLoopCb)
  }
  animation()
}

function normalizeRGBValue(val) {
  return Math.max(0, Math.min(255, val))
}