import { handouts } from './handouts-data.js'

// title of the training, injected by build.mjs in index.html
const trainingTitle = document.querySelector('meta[name="training-title"]')?.content ?? 'Handouts'

const menu = document.getElementById('handout-menu')
const title = document.getElementById('handout-title')
const kind = document.getElementById('handout-kind')
const content = document.getElementById('handout-content')
const searchInput = document.getElementById('handout-search')
const printButton = document.getElementById('handout-print')
const copyButton = document.getElementById('page-copy')
const copyLabel = document.getElementById('page-copy-label')
const pageMenuToggle = document.getElementById('page-menu-toggle')
const pageMenu = document.getElementById('page-menu')
const markdownLink = document.getElementById('page-markdown')
const toast = document.getElementById('page-toast')

const handoutById = new Map(handouts.map(handout => [handout.id, handout]))
let query = ''
let current = null

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
  if (!query) return handouts

  const q = normalize(query)
  return handouts.filter(handout => {
    const haystack = normalize(`${handout.title} ${handout.kind} ${handout.excerpt} ${stripHtml(handout.html)}`)
    return haystack.includes(q)
  })
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, ' ')
}

function highlightHtml(html, rawQuery) {
  const trimmed = rawQuery.trim()
  if (!trimmed) return html

  const terms = Array.from(new Set(trimmed.split(/\s+/).filter(Boolean))).slice(0, 8)
  if (!terms.length) return html

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

  items.forEach(handout => {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = `menu__item${handout.id === activeId ? ' is-active' : ''}`
    button.dataset.id = handout.id
    button.title = handout.excerpt
    // number from the file name (handout-03-…), so it stays stable while searching
    const number = handout.fileName.match(/(\d+)/)?.[1] ?? ''
    button.innerHTML = `
      <span class="menu__index">${number}</span>
      <span class="menu__meta">
        <strong>${handout.title}</strong>
        <small>${handout.kind}</small>
      </span>
    `
    button.addEventListener('click', () => {
      window.location.hash = handout.id
    })
    menu.appendChild(button)
  })
}

function renderHandout(id, section) {
  const visibleHandouts = filteredHandouts()
  const fallback = visibleHandouts[0] || handouts[0]
  const handout = handoutById.get(id) && visibleHandouts.some(item => item.id === id) ? handoutById.get(id) : fallback
  if (!handout) return

  current = handout
  renderMenu(handout.id)
  markdownLink.href = `md/${handout.fileName}`
  title.textContent = handout.title
  kind.textContent = handout.kind
  content.innerHTML = highlightHtml(handout.html, query)
  content.scrollTop = 0
  window.scrollTo({ top: 0 })
  document.title = `${handout.title} · ${trainingTitle}`
  // #<handout>/<section>: open the handout on that section (link from a slide badge)
  const target = section && document.getElementById(section)
  if (target) target.scrollIntoView({ block: 'start' })
}

function syncFromHash() {
  const [id, section] = decodeURIComponent(window.location.hash.replace(/^#/, '')).split('/')
  renderHandout(id, section)
}

// « Copier la page » menu ------------------------------------------------

// public URL of the handout's markdown (published by build.mjs under md/), or null when the page
// is not served over http(s): a chat assistant could not read it
function markdownUrl(handout) {
  if (!/^https?:$/.test(window.location.protocol)) return null
  return new URL(`md/${handout.fileName}`, window.location.href).href
}

const chats = {
  chatgpt: prompt => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
  claude: prompt => `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
}

let toastTimer
function showToast(message) {
  toast.textContent = message
  toast.hidden = false
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toast.hidden = true
  }, 5000)
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // no Clipboard API (file://, older browser): copy through a hidden textarea
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const copied = document.execCommand('copy')
    area.remove()
    return copied
  }
}

let copyTimer
async function copyPage() {
  const copied = await copyText(current.markdown)
  copyLabel.textContent = copied ? 'Copié\u00a0!' : 'Copie impossible'
  clearTimeout(copyTimer)
  copyTimer = setTimeout(() => {
    copyLabel.textContent = 'Copier la page'
  }, 2000)
}

function openInChat(chat) {
  const url = markdownUrl(current)
  if (url) {
    window.open(
      chats[chat](`Lis ce support de formation Zenika\u00a0: ${url}. Puis réponds à mes questions à son sujet.`),
      '_blank',
      'noopener',
    )
    return
  }
  // the assistant cannot read the page: copy the markdown, the participant pastes it
  const copied = copyText(current.markdown)
  window.open(
    chats[chat](
      `Je colle ci-dessous un support de formation Zenika («\u00a0${current.title}\u00a0»). Lis-le, puis réponds à mes questions à son sujet.`,
    ),
    '_blank',
    'noopener',
  )
  copied.then(ok =>
    showToast(
      ok
        ? 'Le markdown de la page est copié\u00a0: collez-le dans la conversation qui vient de s’ouvrir.'
        : 'Copie impossible\u00a0: copiez le texte de la page, puis collez-le dans la conversation.',
    ),
  )
}

function menuItems() {
  return Array.from(pageMenu.querySelectorAll('[role="menuitem"]'))
}

function openPageMenu() {
  pageMenu.hidden = false
  pageMenuToggle.setAttribute('aria-expanded', 'true')
  menuItems()[0].focus()
}

function closePageMenu({ focusToggle = false } = {}) {
  if (pageMenu.hidden) return
  pageMenu.hidden = true
  pageMenuToggle.setAttribute('aria-expanded', 'false')
  if (focusToggle) pageMenuToggle.focus()
}

copyButton.addEventListener('click', copyPage)
pageMenuToggle.addEventListener('click', () => (pageMenu.hidden ? openPageMenu() : closePageMenu()))
pageMenuToggle.addEventListener('keydown', event => {
  if (event.key === 'ArrowDown' && pageMenu.hidden) {
    event.preventDefault()
    openPageMenu()
  }
})
pageMenu.addEventListener('keydown', event => {
  const items = menuItems()
  const index = items.indexOf(document.activeElement)
  const moves = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: items.length - 1 }
  if (event.key in moves) {
    event.preventDefault()
    items[(moves[event.key] + items.length) % items.length].focus()
  } else if (event.key === 'Escape') {
    closePageMenu({ focusToggle: true })
  } else if (event.key === 'Tab') {
    closePageMenu()
  }
})
markdownLink.addEventListener('click', () => closePageMenu())
pageMenu.querySelectorAll('[data-chat]').forEach(button =>
  button.addEventListener('click', () => {
    closePageMenu()
    openInChat(button.dataset.chat)
  }),
)
document.addEventListener('click', event => {
  if (!event.target.closest('#page-actions')) closePageMenu()
})

window.addEventListener('hashchange', syncFromHash)
searchInput.addEventListener('input', event => {
  query = event.target.value
  syncFromHash()
})
printButton.addEventListener('click', () => window.print())
syncFromHash()
