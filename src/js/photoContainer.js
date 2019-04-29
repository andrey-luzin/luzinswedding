$(document).ready(function(){
  $('.js-photoContainer').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<button class="photoContainer__arrow photoContainer__arrow--prev"></button>',
    nextArrow: '<button class="photoContainer__arrow photoContainer__arrow--next"></button>',
    dots: false,
    autoplay: true,
    autoplaySpeed: 6000
  });
});
