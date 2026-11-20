import { handouts } from './handouts-data.js'

const menu = document.getElementById('handout-menu')
const title = document.getElementById('handout-title')
const excerpt = document.getElementById('handout-excerpt')
const fileName = document.getElementById('handout-file')
const content = document.getElementById('handout-content')
const searchInput = document.getElementById('handout-search')

const handoutById = new Map(handouts.map(handout => [handout.id, handout]))
let query = ''

function normalize(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function filteredHandouts() {
  if (!query)
    return handouts

  const q = normalize(query)
  return handouts.filter((handout) => {
    const haystack = normalize(`${handout.title} ${handout.fileName} ${handout.excerpt} ${stripHtml(handout.html)}`)
    return haystack.includes(q)
  })
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, ' ')
}

function highlightHtml(html, rawQuery) {
  const trimmed = rawQuery.trim()
  if (!trimmed)
    return html

  const terms = Array.from(new Set(trimmed.split(/\s+/).filter(Boolean))).slice(0, 8)
  if (!terms.length)
    return html

  const pattern = terms.map(term => escapeRegExp(term)).join('|')
  const regex = new RegExp(`(${pattern})`, 'gi')

  return html.replace(regex, '<mark>$1</mark>')
}

function renderMenu(activeId) {
  menu.innerHTML = ''
  const items = filteredHandouts()

  if (!items.length) {
    const empty = document.createElement('p')
    empty.className = 'menu__empty'
    empty.textContent = 'Aucun handout ne correspond à la recherche.'
    menu.appendChild(empty)
    return
  }

  items.forEach((handout, index) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = `menu__item${handout.id === activeId ? ' is-active' : ''}`
    button.dataset.id = handout.id
    button.innerHTML = `
      <span class="menu__index">${String(index + 1).padStart(2, '0')}</span>
      <span class="menu__meta">
        <strong>${handout.title}</strong>
        <small>${handout.fileName}</small>
      </span>
    `
    button.addEventListener('click', () => {
      window.location.hash = handout.id
    })
    menu.appendChild(button)
  })
}

function renderHandout(id) {
  const visibleHandouts = filteredHandouts()
  const fallback = visibleHandouts[0] || handouts[0]
  const handout = handoutById.get(id) && visibleHandouts.some(item => item.id === id)
    ? handoutById.get(id)
    : fallback
  if (!handout)
    return

  renderMenu(handout.id)
  title.textContent = handout.title
  excerpt.textContent = handout.excerpt
  fileName.textContent = handout.fileName
  content.innerHTML = highlightHtml(handout.html, query)
  document.title = `${handout.title} · Context Engineering Handouts`
}

function syncFromHash() {
  const id = window.location.hash.replace(/^#/, '')
  renderHandout(id)
}

window.addEventListener('hashchange', syncFromHash)
searchInput.addEventListener('input', (event) => {
  query = event.target.value
  syncFromHash()
})
syncFromHash()
