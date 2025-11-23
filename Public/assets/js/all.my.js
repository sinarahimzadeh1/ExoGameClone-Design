
// Initialize Swiper
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 2500
    },
});


// For bootsrtap tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})
const open = document.querySelector(".open")
const close = document.querySelector(".close")
open.addEventListener("click", () => {
    close.classList.toggle("d-none")
});


// For sub menu
$(document).ready(function () {
    $('.header-btn').hover(function () {
        var id = $(this).data('id');
        $('.subMenu').removeClass('active').addClass('hide');
        $(this).find('.subMenu').removeClass('hide').addClass('active');
    });
});


// back to top button 
$(document).ready(function () {
    var back_to_top_button = ['<button class="btn-top bg-glass"><i class="fa fa-angle-up" aria-hidden="true"></i></button>'].join("");
    $("body").append(back_to_top_button)

    $(".btn-top").hide();

    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 150) {
                $('.btn-top').fadeIn();
            } else {
                $('.btn-top').fadeOut();
            }
        });

        $('.btn-top').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 100);
            return false;
        });
    });

});


// make float header 
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            $('.first-header').addClass('shadow-sm');
            $('.myLogo').fadeIn('active');
        } else {
            $('.first-header').removeClass('shadow-sm');
            $('.myLogo').fadeOut('active');
        }
    });
});


// Mini Slider for items
(function () {
    // A class for building sliders from it
    class Slider {
        constructor(id, mediaQueries) {

            // Get HTML elements
            this.slider = document.querySelector(`#${id}`);
            this.sliderList = this.slider.querySelector('.mini-slider-list');
            this.sliderItems = this.slider.querySelectorAll('.mini-slider-item');
            this.sliderNext = this.slider.querySelector('.mini-slider-arrow-next');
            this.sliderPrev = this.slider.querySelector('.mini-slider-arrow-prev');

            // Get media queries
            this.mediaQueryList = [window.matchMedia(`screen and (max-width:${mediaQueries[0] - 1}px)`)];
            mediaQueries.forEach((mediaQuery) => {
                this.mediaQueryList.push(window.matchMedia(`screen and (min-width:${mediaQuery}px)`));
            });

            // Define global variables
            this.numberOfVisibleItems = null;
            this.currentItemIndex = null;
            this.sliderItemsLength = this.sliderItems.length;
            this.mediaQueryLength = this.mediaQueryList.length;

            // Add event listener: to call the run function again when screen resized
            this.mediaQueryList.forEach((mediaQuery) => {
                mediaQuery.addEventListener('change', () => {
                    this.run();
                });
            });

            // Add event listener: to go to next slide
            this.sliderNext.addEventListener('click', () => {
                if (this.currentItemIndex < this.sliderItemsLength - this.numberOfVisibleItems) {
                    this.currentItemIndex++;
                    this.shiftSlides();
                }
            });

            // Add event listener: to go to previous slide
            this.sliderPrev.addEventListener('click', () => {
                if (this.currentItemIndex > 0) {
                    this.currentItemIndex--;
                    this.shiftSlides();
                }
            });

            // Disable focus on all slides links
            this.sliderItems.forEach((item) => {
                const elements = item.querySelectorAll('a');
                elements.forEach((element) => {
                    element.tabIndex = '-1';
                });
            });
        }

        // Run the slider
        run() {
            let index = this.mediaQueryLength - 1;
            while (index >= 0) {
                if (this.mediaQueryList[index].matches) {
                    // Set number of visible slides
                    this.numberOfVisibleItems = index + 2;

                    // Reset the slider
                    this.currentItemIndex = 0;
                    this.sliderList.style.transform = 'translateX(0%)';

                    // Set slider list width
                    this.sliderList.style.width = `calc(${(100 / this.numberOfVisibleItems) * this.sliderItemsLength}% + ${(this.sliderItemsLength / this.numberOfVisibleItems) * 16}px)`;

                    // Set slides width
                    this.sliderItems.forEach((item) => {
                        item.style.width = `${100 / this.numberOfVisibleItems}%`;
                    });
                    
                    // Exit the loop
                    break;
                }
                index--;
            }
        }

        // A function to shift slides left and right
        shiftSlides() {
            this.sliderList.style.transform = `translateX(-${(100 / this.sliderItemsLength) * this.currentItemIndex}%)`;
        }
    }

    /* 
    Note about creating new slider:
    First parameter is the id of the HTML mini-slider-container element of each slider.
    Second parameter is an array of the media queries (breaking points) where the number of slides increases.
    */

    // Create a new slider and run it
    new Slider('new-products', [600, 900]).run();
    new Slider('new-products-2', [600, 900]).run();
})();