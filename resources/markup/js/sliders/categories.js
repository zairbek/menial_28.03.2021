import Swiper from "swiper";
import 'swiper/swiper-bundle.css'
import SwiperCore, { Navigation, Pagination, Mousewheel } from 'swiper/core';

SwiperCore.use([Navigation, Pagination, Mousewheel]);

export const indexCategorySwiper = () => {

  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 2,
    spaceBetween: 10,
    freeMode: true,

    mousewheel: {
      forceToAxis: true
    },

    navigation: {
      nextEl: '.slide_category-swiper.button_next',
      prevEl: '.slide_category-swiper.button_prev',
    },

    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      425: {
        slidesPerView: 3,
        spaceBetween: 15
      },
      600: {
        slidesPerView: 4,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 5,
        spaceBetween: 20
      },
      896: {
        slidesPerView: 6,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: 7,
        spaceBetween: 20
      },
      1232: {
        slidesPerView: 8,
        spaceBetween: 20
      },
      1440: {
        slidesPerView: 9,
        spaceBetween: 20
      },
      1544: {
        slidesPerView: 10,
        spaceBetween: 20
      }
    }
  })

}

