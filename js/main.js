gsap.registerPlugin('ScrollTrigger');

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

    sortBtns.forEach(el=> el.classList.remove('is-on'))
    item.classList.add('is-on')
    sortItems.removeAttribute('class');
    sortItems.setAttribute('class','standarts-list');
    sortItems.classList.add(`is-${dataSort}`)
  })
})


let $finishSections = $('.finish-section');
let $finishOpen = $finishSections.closest('.finish-panel__show');
let $finishPopup = $finishSections.closest('.finish-panel-popup');

$finishSections.each(function() {
  let $section = $(this);

  let $panelOpen = $section.find('.finish-panel__show');
  let $panelClose = $panelOpen.next();
  let $panel = $section.find('.finish-panel-popup');
  let $sliders = $section.find('.finish-slider');
  let $types = $section.find('.finish-type');

  let $filterControls = $section.find('[data-filter-controls]');


  $filterControls.on('click', function(){
    let $dataFilter = $(this).attr('data-filter-controls');
    let $dataSection = $section.find(`.finish-slider[data-filter=${$dataFilter}]`);
 
    $sliders.removeClass('is-open');
    $dataSection.addClass('is-open');
    $types.removeClass('is-active');
    $filterControls.removeClass('is-active')

    $(this).addClass('is-active');

    
    if($dataFilter == 'balanced-classic-l' || $dataFilter == 'balanced-scan-l') {
      $(this).closest('.finish-type').find('.finish-type__theme-white').addClass('is-active')
    }
    
    if($dataFilter == 'advanced-classic-l' || $dataFilter == 'advanced-scan-l') {
      $(this).closest('.finish-type').find('.finish-type__theme-white').addClass('is-active')
    }

    if($('finish-type__theme-item').has('is-active')) {
      $(this).closest('.finish-type').addClass('is-active');
    }

    if($panel) {
      closePanel();
    }
  })

  $panelOpen.on('click', function(){
    showPanel();
  })

  $panelClose.on('click', function(){
    closePanel();
  })

  function showPanel() {
    $panelClose.addClass('is-show');
    $panelOpen.addClass('is-active');
    $panel.addClass('is-open');
  }

  function closePanel () {
    $panel.removeClass('is-open');
    $panelClose.removeClass('is-show');
    $panelOpen.removeClass('is-active');
  }
})



function slideFromDown(item, container) {
  let $animationContainer = container;
  let $animationBlocksArr =  item;

  gsap.fromTo(
      $animationBlocksArr,
    { y: "50%", opacity: 0 },
    {
      y: "0%",
      opacity: 1,
      delay: .4,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.4,
      scrollTrigger: {
        trigger: $animationContainer,
        start: "top 90%",
      },
    }
  );
}

function slideFromRight(item, container) {
  let $animationContainer = container;
  let $animationBlocksArr =  item;

  gsap.fromTo(
      $animationBlocksArr,
    { x: "-50%", opacity: 0 },
    {
      x: "0%",
      opacity: 1,
      delay: .4,
      duration: 2.5,
      ease: "expo.out",
      stagger: 0.25,
      scrollTrigger: {
        trigger: $animationContainer,
        start: "top 90%",
      },
    }
  );
}

function scaleAnimation (item, container) {
  let $animationContainer = container;
  let $animationBlocksArr =  item;

  gsap.fromTo(
      $animationBlocksArr,
    { scale: 0, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      delay: .2,
      duration: 1.5,
      ease: "expo.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: $animationContainer,
        start: "top 90%",
      },
    }
  );
}

slideFromDown($('.advantages-item'), $('.advantages'));
slideFromDown($('.infrastructure-item'), $('.infrastructure-list'));
slideFromDown($('.features-item'), $('.features-items'));
slideFromDown($('.quarter.living'), $('.quarter'));
slideFromDown($('.quarter.quarter-offices'), $('.quarter'));
slideFromDown($('.finish'), $('.finish'));
slideFromDown($('.standarts-sort__item'), $('.standarts-sort'));
slideFromDown($('.footer__title'), $('.footer__title'));
slideFromDown($('.footer-company'), $('.footer-company'));
slideFromDown($('.footer-adress'), $('.footer-adress'));
slideFromRight($('.infrastructure-map'), $('.infrastructure'));
scaleAnimation($('.standarts-list'), $('.standarts'));



