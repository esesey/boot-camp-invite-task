const searchInput = document.getElementById('search-input')
const prevPageButton = document.getElementById('prev-page')
const nextPageButton = document.getElementById('next-page')
const pageNumber = document.getElementById('page-num')
const loadingIndicator = document.getElementById('loading-indicator')
let cards = []
let page = 1
pageNumber.textContent = page

async function fetchCards() {
    loadingIndicator.style.display = 'block'
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then(response => response.json())
    .then(json => {
      cards = json.results
      cards.forEach(appendCard)})
    .catch(error => console.error('error fetching data:', error))
    .finally(() => {loadingIndicator.style.display = 'none'})

    console.log('just fetched')
}

// Поиск выполняется по тем параметрам, которые показаны на карточке
function updateSearch() {
  const filter = searchInput.value.toLowerCase()
  const filteredCards = cards.filter(card =>
    card.name.toLowerCase().includes(filter) ||
    card.species.toLowerCase().includes(filter) ||
    card.status.toLowerCase().includes(filter) ||
    card.location.name.toLowerCase().includes(filter)
  )

  clearCards()
  filteredCards.forEach(appendCard)

  console.log('just updated')
}

function composeCard(cardData) {
  if (!cardData) {
    console.error('not found card data')
    return;
  }

  const template = document.getElementById('character-card')

  if (!template) {
    console.error('not found card template')
    return;
  }
  
  const card = template.content.cloneNode(true)
  const { name, image, species, status, location } = cardData
  
  card.querySelector('h2').textContent = name
  card.querySelector('img').src = image    
  card.querySelector('p1').textContent =  species
  card.querySelector('p2').textContent = status
  card.querySelector('p3').textContent =  location.name
  
  return card
}

function appendCard(cardData) {
  if (!cardData) {
    console.error('not found card data')
    return;
  }
  
  const main = document.getElementById('main')
  const cardNode = composeCard(cardData)
  
  main.append(cardNode)
}

function clearCards() {
  let elements = document.querySelectorAll('.character')
  elements.forEach(element => element.remove())
}

function updatePage(){
  clearCards()
  fetchCards()
  pageNumber.textContent = page
}

function handlePrevPage() {
  if (page != 1) {
    page--
    updatePage()
  }
  console.log('prev', page)
}

function handleNextPage() {
  if (page != 42) {
    page++
    updatePage()
  }
  console.log('next', page)
}

document.addEventListener('DOMContentLoaded', function() {
  searchInput.onchange = updateSearch
  prevPageButton.onclick = handlePrevPage
  nextPageButton.onclick = handleNextPage
  fetchCards()
})