let pageViewed = false

async function fetchCards() {
    fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.json())
    .then(json => json.results.forEach(appendCards))
}

function composeCard(cardData) {
    // Если ничего не передано, ничего не возвращаем
    if (!cardData) {
      console.error('not found cardData')
      return;
    }
  
    // Обращаемся к старому шаблону
    const template = document.getElementById('character-card')
    
    if (!template) {
      console.error('not found card template')
      return;
    }

    // Клонируем
    const card = template.content.cloneNode(true)
  
    // Получаем нужную информацию
    const { name, image, species, status, location } = cardData
  
    // Добавляем соответствующие тексты и числа
    card.querySelector('h2').textContent = 'Name: ' + name
    card.querySelector('img').src = image    
    card.querySelector('p1').textContent = 'Species: ' + species
    card.querySelector('p2').textContent = 'Status: ' + status
    card.querySelector('p3').textContent = 'Location: ' + location.name
  
    // Возвращаем созданный элемент
    return card
  }

function appendCards(cardData) {
    // Если данных нет, ничего не делаем
    if (!cardData) return
  
    // Храним ссылку на элемент
    const main = document.getElementById('main')
  
    // Превращает данные в HTML-элемент
    const cardNode = composeCard(cardData)
  
    // Добавляем созданный элемент в <main>
    main.append(cardNode)
  }

async function checkPosition() {
    // Высота документа и экрана
    const height = document.body.offsetHeight
    const screenHeight = window.innerHeight
  
    // Сколько пикселей уже проскроллили
    const scrolled = window.scrollY
  
    // Порог
    const threshold = height - screenHeight / 4
  
    // Низ экрана относительно страницы
    const position = scrolled + screenHeight
  
    if (position >= threshold) {
      await fetchCards()
    }
  }

function throttle(callee, timeout) {
    let timer = null

    return function perform(...args) {
      if (timer) return
  
      timer = setTimeout(() => {
        callee(...args)
  
        clearTimeout(timer)
        timer = null
      }, timeout)
    }
  }  

  ;(() => {
    window.addEventListener('scroll', throttle(checkPosition, 250))
    window.addEventListener('resize', throttle(checkPosition, 250))
    window.addEventListener('firast_fetch', function(){
      if (!pageViewed) {fetchCards(); pageViewed=true}
    })
  })()