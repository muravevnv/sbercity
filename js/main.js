lozad('.lozad', {
  load: function(el) {
      el.src = el.dataset.src;
      el.onload = function() {
          el.classList.add('fade')
      }
  }
}).observe()

let quarterGalleryItems = document.querySelectorAll('.quarter-gallery');

quarterGalleryItems.forEach(function(item) {
  let prevBtn = item.querySelector('.slider-nav__prev');
  let nextBtn = item.querySelector('.slider-nav__next');
  let pagination = item.querySelector('.swiper-pagination');

  const quarterGallery = new Swiper(item, {
    parallax: true,
    effect: "slide",
    slidesPerView: 1,
    speed: 2000,
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn
    },
  
    watchSlidesProgress: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },

    breakpoints: {
      0: {
        pagination: {
          el: pagination,
          clickable: true,
          type: 'custom',
          renderCustom: function (swiper, current, total) {
            return `${current} из ${total}`
          }
        }
      },
      1023: {
        pagination: {
          el: pagination,
          clickable: true,
          type: 'bullets',
          renderBullet: function (index, className) {
            return `<span class="${className}"> ${index} </span> `
          }
        },
      }
    }
  })  
})


let finishGalleryItems = document.querySelectorAll('.finish-slider');

finishGalleryItems.forEach(function(item) {
  let prevBtn = item.querySelector('.slider-nav__prev');
  let nextBtn = item.querySelector('.slider-nav__next');
  let pagination = item.querySelector('.swiper-pagination');

  const finishGallery = new Swiper(item, {

    slidesPerView: 2,
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn
    },
  
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },

    watchSlidesProgress: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
        pagination: {
          el: pagination,
          clickable: true,
          type: 'custom',
          renderCustom: function (swiper, current, total) {
            return `${current} из ${total}`
          }
        }
      },
      1023: {
        slidesPerView: 2,
        pagination: {
          el: pagination,
          clickable: true,
          type: 'bullets',
          renderBullet: function (index, className) {
            return `<span class="${className}"> ${index} </span> `
          }
        },
      }
    }
  })
})


if (document.querySelector('[data-role*="tabs"]')) {
  let tabsContainers = document.querySelectorAll('[data-role*="tabs"]');
  tabsContainers.forEach((wrapper) => {
      let controls = wrapper.querySelectorAll('[data-tabs-control]'),
          panels = wrapper.querySelectorAll('[data-tabs-panel]');
      controls.forEach((control) => {
          control.addEventListener('click', (e) => {
              if (e.target.closest('[data-tabs-control]')) {
                  e.preventDefault();
                  let activeControl = e.target.closest('[data-tabs-control]'),
                      activeId = activeControl.dataset.tabsControl;
                  if (!activeControl.classList.contains('is-on')) {
                      controls.forEach((oneMoreControl) => {
                          oneMoreControl.classList.remove('is-on');
                      });
                      activeControl.classList.add('is-on');
                      panels.forEach((panel) => {
                          panel.classList.remove('is-open');
                      })
                      panels.forEach((panel) => {
                          if (panel.dataset.tabsPanel == activeId) {
                              panel.classList.add('is-open');
                          }
                      });
                  }
              }
          });
      });
  })
}

// Сортировка стандартов жилья

let sortBtns = document.querySelectorAll('.standarts-sort__item');
let sortItems = document.querySelector('.standarts-list')

sortBtns.forEach(function(item){
  item.addEventListener('click', function(){
    let dataSort = item.dataset.sort;
    console.log(dataSort);
    sortBtns.forEach(el=> el.classList.remove('is-on'))
    item.classList.add('is-on')
    sortItems.removeAttribute('class');
    sortItems.setAttribute('class','standarts-list');
    sortItems.classList.add(`is-${dataSort}`)
  })
})



