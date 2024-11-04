// faz o bagulho funcionar

let carousel = document.querySelector(".carousel");
let btns = document.querySelectorAll(".wrapper i");
let carouselChildren = [...carousel.children];
let wrapper = document.querySelector(".wrapper");

//obter a largura do cartão
let cardWidth = carousel.querySelector(".card").offsetWidth;
let isDragging = false,
  startX,
  startScrollLeft,
  isAutoPlay = true,
  timeoutId;

//obter o número de cartões que podem caber no carrossel de uma só vez
let cardsPerView = Math.round(carousel.offsetWidth / cardWidth);

//inserir os últimos cartões copiados no início do carrossel para uma deslocação infinita
carouselChildren
  .slice(-cardsPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

//inserir alguns primeiros cartões copiados no fim do carrossel para uma deslocação infinita
carouselChildren.slice(0, cardsPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    //se o id do botão clicado for esquerdo, deslocar o carrossel para a esquerda pela largura do cartão senão para a direita pela largura do cartão
    carousel.scrollLeft += btn.id == "left" ? -cardWidth : cardWidth;
  });
});

let dragStart = (e) => {
  isDragging = true;

  carousel.classList.add("dragging");

  //registo do cursor inicial e da posição de deslocação
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

let dragging = (e) => {
  //retorna aqui se o valor isDragging for falso
  if (!isDragging) return;

  //deslocação do carrossel de acordo com o cursor do rato
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

let dragStop = () => {
  isDragging = false;

  carousel.classList.remove("dragging");
};

let infiniteScroll = () => {
  //se o carrossel estiver no início, deslocar para o fim
  //caso contrário, o carrossel está no fim, deslocar-se para o início
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

   //limpar o tempo limite e iniciar a reprodução automática se o rato não estiver a pairar sobre o carrossel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

let autoPlay = () => {
  //if the device is not mobile or tab, enabling auto play
  if (window.innerWidth < 800 || !isAutoPlay) return; //returning if the device is not desktop & isAutoPlay is false

  //autoplaying the carousel after every 2500 ms
  
};

autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);

//auto play will be active only when there is no hover on carousel
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);



function aparecer(){
  const menu = document.getElementById("lat")
  menu.classList.toggle("hidden")
}


const readMoreButtons = document.querySelectorAll('.button');

readMoreButtons.forEach((button) => {
  button.addEventListener('click', function() {
    const listId = this.getAttribute('data-target');
    const textContent = document.getElementById(listId);

    textContent.classList.toggle('hidden');
    

    this.textContent = textContent.classList.contains('hidden')
      ? 'Abrir'
      : 'Fechar';
  });
});

function changeTheme() {
  document.body.classList.toggle('dark');
}