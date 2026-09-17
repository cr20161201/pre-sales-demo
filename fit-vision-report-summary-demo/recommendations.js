const tabs = [...document.querySelectorAll('[data-tab]')]
const panels = {
  outfits: document.querySelector('#outfits-panel'),
  items: document.querySelector('#items-panel'),
}

function activateButton(buttons, selected) {
  buttons.forEach((button) => button.classList.toggle('is-active', button === selected))
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const selected = tab.dataset.tab
    tabs.forEach((button) => {
      const active = button === tab
      button.classList.toggle('is-active', active)
      button.setAttribute('aria-selected', String(active))
    })
    Object.entries(panels).forEach(([name, panel]) => {
      panel.hidden = name !== selected
    })
  })
})

const outfitFilters = [...document.querySelectorAll('[data-outfit-filter]')]
const outfits = [...document.querySelectorAll('.catalog-outfit')]
const outfitEmpty = document.querySelector('[data-outfit-empty]')

outfitFilters.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.outfitFilter
    let visibleCount = 0
    outfits.forEach((outfit) => {
      const visible = filter === 'all' || outfit.dataset.category.split(' ').includes(filter)
      outfit.hidden = !visible
      if (visible) visibleCount += 1
    })
    outfitEmpty.hidden = visibleCount > 0
    activateButton(outfitFilters, button)
  })
})

const itemFilters = [...document.querySelectorAll('[data-item-filter]')]
const items = [...document.querySelectorAll('.catalog-item')]
const itemEmpty = document.querySelector('[data-item-empty]')
const loadMore = document.querySelector('[data-load-more]')
let extrasRevealed = false

function filterItems(filter) {
  let visibleCount = 0
  items.forEach((item) => {
    const categoryMatches = filter === 'all' || item.dataset.category === filter
    const loadMatches = extrasRevealed || !item.hasAttribute('data-extra')
    const visible = categoryMatches && loadMatches
    item.hidden = !visible
    if (visible) visibleCount += 1
  })
  itemEmpty.hidden = visibleCount > 0
  loadMore.hidden = extrasRevealed || filter === 'bottoms'
}

itemFilters.forEach((button) => {
  button.addEventListener('click', () => {
    activateButton(itemFilters, button)
    filterItems(button.dataset.itemFilter)
  })
})

loadMore.addEventListener('click', () => {
  extrasRevealed = true
  const activeFilter = document.querySelector('[data-item-filter].is-active').dataset.itemFilter
  filterItems(activeFilter)
})

const toast = document.querySelector('.toast')
let toastTimer

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
