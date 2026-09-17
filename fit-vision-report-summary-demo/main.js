const densityButtons = [...document.querySelectorAll('[data-density]')]
const details = [...document.querySelectorAll('details')]
const toast = document.querySelector('.toast')
let toastTimer

function setPressed(buttons, activeButton) {
  buttons.forEach((button) => {
    const active = button === activeButton
    button.classList.toggle('is-active', active)
    button.setAttribute('aria-pressed', String(active))
  })
}

densityButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const showFull = button.dataset.density === 'full'
    details.forEach((detail) => {
      detail.open = showFull
    })
    setPressed(densityButtons, button)
  })
})

document.querySelectorAll('[data-try-on]').forEach((button) => {
  button.addEventListener('click', () => {
    window.clearTimeout(toastTimer)
    toast.textContent = `已选择「${button.dataset.tryOn}」，Demo 将进入实时试衣。`
    toast.hidden = false
    toastTimer = window.setTimeout(() => {
      toast.hidden = true
    }, 2400)
  })
})

// FALLBACK: vendor/pretext.js is unavailable, so text measurement uses the CDN when reachable.
async function enablePretextLayout() {
  try {
    const { prepare, layout } = await import('https://esm.sh/@chenglou/pretext')
    const prepared = new Map()
    const elements = [...document.querySelectorAll('[data-pretext]')]

    await document.fonts.ready

    function prepareElement(element) {
      const style = getComputedStyle(element)
      prepared.set(element, prepare(element.textContent ?? '', style.font))
    }

    function relayout() {
      prepared.forEach((handle, element) => {
        const style = getComputedStyle(element)
        const lineHeight = Number.parseFloat(style.lineHeight)
        const result = layout(handle, element.clientWidth, lineHeight)
        element.style.minHeight = `${result.height}px`
      })
    }

    elements.forEach((element) => {
      prepareElement(element)
      new MutationObserver(() => {
        prepareElement(element)
        relayout()
      }).observe(element, { characterData: true, subtree: true, childList: true })
    })

    new ResizeObserver(relayout).observe(document.body)
    relayout()
  } catch {
    // CSS layout remains fully functional when the optional CDN is unavailable.
  }
}

enablePretextLayout()
