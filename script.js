let cards = []
const searchInput = document.getElementById('search-input');

async function fetchCards() {
    fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.json())
    .then(json => {
      cards = json.results
      cards.forEach(appendCards)})
    .catch(error => console.error('error fetching data:', error))
    console.log('just fetched');
}

function updateSearch() {
  const filter = searchInput.value.toLowerCase()
  const filteredCards = cards.filter(card =>
    card.name.toLowerCase().includes(filter))
  const main = document.getElementById('main');

  filteredCards.forEach(appendCards)

  console.log('just updated');
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

function appendCards(cardData) {
  if (!cardData) {
    console.error('not found card data')
    return;
  }
  
  const main = document.getElementById('main')
  const cardNode = composeCard(cardData)
  
  main.append(cardNode)
}

document.addEventListener('DOMContentLoaded', function() {
  searchInput.addEventListener('input', updateSearch);
  fetchCards();
});