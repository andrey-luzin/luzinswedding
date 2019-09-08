$(document).ready(function(){
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
      prevArrow: '<button class="galleryModal__arrow galleryModal__arrow--prev"></button>',
      nextArrow: '<button class="galleryModal__arrow galleryModal__arrow--next"></button>',
    });
  }

  function openModal(self) {
    $('.galleryModal').show();
    $('.galleryModal').addClass("galleryModal--active");
    $('html').css({'overflow': 'hidden'});
    var slideIndex = self.index();
    initCarousel();
    $('.js-gallerySlider').slick('slickGoTo', slideIndex, true);
  }

  function closeModal(){
    $(".galleryModal").hide();
    $(".galleryModal").removeClass("galleryModal--active");
    $('html').css({'overflow': 'visible'});
    $('.js-gallerySlider').slick('unslick');
  }

  $(".galleryModal__modalClose").on("click", function(){
    closeModal();
  });

  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      closeModal();
    }
  });
});
