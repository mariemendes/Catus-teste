document.addEventListener('DOMContentLoaded', function () {
  //products shelf
  fetch('products.json')
    .then((response) => response.json())
    .then((products) => {
      const productsContainer = document.getElementById('products');
      products.forEach((product) => {
        const productElement = document.createElement('div');
        productElement.className = 'swiper-slide';

        let discountHTML = '';
        if (product.discount) {
          discountHTML = `<div class="discount"><p><span>${product.discount}</span>Off</p></div>`;
        }

        productElement.innerHTML = `
                  <div>
                      ${discountHTML}
                      <img src="assets/${product.image}" alt="${product.name}">
                  </div>
                  <h3>${product.name}</h3>
                  <p class="price">${product.price}</p>
                  <p class="price-discount">${product.priceDescount}</p>
                  <p class="parcels"><span>${product.parcels}x</span> de <span>${product.valueParcels}</span> sem juros</p>
                  <button class="add-to-cart">Adicionar ao Carrinho</button>
              `;
        productsContainer.appendChild(productElement);
      });

      const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        slidesPerView: 1,
        loop: true,
        loopAdditionalSlides: 1,
        pagination: {
          el: '.swiper-pagination',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          991: {
            slidesPerView: 4,
          },
        },
        on: {
          slideNextTransitionEnd: function () {
            if (this.isEnd) {
              this.slideTo(0);
            }
          },
          init: function () {
            if (this.slides.length <= this.params.slidesPerView) {
              this.params.loop = false;
              this.loopDestroy();
            }
          },
          slidePrevTransitionEnd: function () {
            if (this.isBeginning) {
              this.slideTo(this.slides.length - 1);
            }
          },
        },
      });

      const addToCartButtons = document.querySelectorAll('.add-to-cart');
      addToCartButtons.forEach((button) => {
        button.addEventListener('click', function () {
          const productName = this.parentElement.querySelector('h3').innerText;
          alert(`${productName} foi adicionado ao carrinho!`);
        });
      });
    })
    .catch((error) => console.error('Erro ao carregar os produtos:', error));

  //header mobile
  const hamburger = document.querySelector('.hamburger');
  const navContainer = document.querySelector('.nav-container');

  hamburger.addEventListener('click', () => {
    navContainer.classList.toggle('show');
  });
});
