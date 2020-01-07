import './css/styles.css'

const canvas = document.querySelector('#canvas')
const c = canvas.getContext('2d')
let requestId // eslint-disable-line
const mouse = { x: innerWidth / 2, y: innerHeight / 2 }

// event Handlers
window.addEventListener('mousemove', ({ clientX, clientY }) => {
  mouse.x = clientX
  mouse.y = clientY
})

window.addEventListener('resize', () => {
  init()
})


function init () {
  canvas.width = innerWidth
  canvas.height= innerHeight
}

function animate () {
  requestId = window.requestAnimationFrame(animate)

  c.clearRect(0, 0, canvas.width, canvas.height)
  c.fillText('Canvas Playground', mouse.x, mouse.y)
}

init()
animate()