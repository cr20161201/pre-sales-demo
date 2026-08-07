const SCREEN_WIDTH = 1080
const SCREEN_HEIGHT = 1920

function updateScale() {
  const scale = Math.min(
    window.innerWidth / SCREEN_WIDTH,
    window.innerHeight / SCREEN_HEIGHT,
    1,
  )

  document.documentElement.style.setProperty('--kiosk-scale', String(scale))
}

updateScale()
window.addEventListener('resize', updateScale)
window.visualViewport?.addEventListener('resize', updateScale)
