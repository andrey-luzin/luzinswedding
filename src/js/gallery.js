$(document).ready(function(){
  $('.gallery__image').lazy();
  $('.gallery__image').lazy();
  
  $(".gallery__item").on("click", function(){
    openModal($(this));
  });

  $(".gallery__item").on("keyup", function(e){
    if (e.keyCode == 13) {
      openModal($(this));
    }
  });
  
  function initCarousel() {
    $('.js-gallerySlider').slick({
      appendArrows: $(".js-galleryNav"),
      // adaptiveHeight: true,
      prevArrow: '<button class="gallery__arrow gallery__arrow--prev"></button>',
      nextArrow: '<button class="gallery__arrow gallery__arrow--next"></button>',
    });
  }

  function openModal(self) {
    $('.gallery__modal').show();
    $('.gallery__modal').addClass("gallery__modal--active");
    $('html').css({'overflow': 'hidden'});
    var slideIndex = self.index();
    initCarousel();
    $('.js-gallerySlider').slick('slickGoTo', slideIndex, true);
  }

  function closeModal(){
    $(".gallery__modal").hide();
    $(".gallery__modal").removeClass("gallery__modal--active");
    $('html').css({'overflow': 'visible'});
    $('.js-gallerySlider').slick('unslick');
  }

  $(".gallery__modalClose").on("click", function(){
    closeModal();
  });

  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      closeModal();
    }
  });
});
