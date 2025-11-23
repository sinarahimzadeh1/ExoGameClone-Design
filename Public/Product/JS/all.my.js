// Magnify Image On Hover

if (window.innerWidth > 992) {

    (function ($) {

        var SPACING = 15;

        $.fn.jqZoom = function (options) {
            $(this).each(function (i, dom) {
                var me = $(dom);
                _initZoom(me, options.selectorWidth, options.selectorHeight);
                var imgUrl = options && options.zoomImgUrl ? options.zoomImgUrl : me.attr("src");
                _initViewer(me, imgUrl, options.viewerWidth, options.viewerHeight);
            })
        }

        var _initZoom = function (target, sWidth, sHeight) {
            var $zoom = $("<div />").addClass("zoom-selector").width(sWidth).height(sHeight);
            target.after($zoom);
            target.closest(".zoom-box").on({
                mousemove: function (e) {
                    var mouseX = e.pageX - $(this).offset().left;
                    var mouseY = e.pageY - $(this).offset().top;
                    var halfSWidth = sWidth / 2, halfSHeight = sHeight / 2;
                    var realX, realY;
                    if (mouseX < halfSWidth) {
                        realX = 0;
                    } else if (mouseX + halfSWidth > target.width()) {
                        realX = target.width() - sWidth;
                    } else {
                        realX = mouseX - halfSWidth;
                    }
                    if (mouseY < halfSHeight) {
                        realY = 0;
                    } else if (mouseY + halfSHeight > target.height()) {
                        realY = target.height() - sHeight;
                    } else {
                        realY = mouseY - halfSHeight;
                    }
                    $zoom.css({
                        left: realX,
                        top: realY
                    })
                    var viewerX = realX * ($(this).find(".viewer-box>img").width() - $(this).find(".viewer-box").width()) / (target.width() - sWidth);
                    var viewerY = realY * ($(this).find(".viewer-box>img").height() - $(this).find(".viewer-box").height()) / (target.height() - sHeight);
                    $(this).find(".viewer-box>img").css({
                        left: -viewerX,
                        top: -viewerY
                    })
                },
                mouseenter: function () {
                    $zoom.css("display", "block");
                    $(this).find(".viewer-box").css("display", "inherit");
                },
                mouseleave: function () {
                    $zoom.css("display", "none");
                    $(this).find(".viewer-box").css("display", "none");
                }
            })
        }

        var _initViewer = function (target, imgUrl, vWidth, vHeight) {
            var $viewer = $("<div />").addClass("viewer-box").width(vWidth).height(vHeight);
            var $zoomBox = target.closest(".zoom-box");
            $viewer.css({
                right: target.width() + SPACING,
                top: 0
            })
            _setOriginalSize(target, function (oWidth, oHeight) {
                var $img = $("<img src='" + imgUrl + "' />").width(oWidth).height(oHeight);
                $viewer.append($img);
                target.after($viewer);
            });
        }

        var _setOriginalSize = function (target, callback) {
            var newImg = new Image();
            newImg.src = target.attr("src") + "?date=" + new Date();
            $(newImg).on("load", function () {
                callback(newImg.width, newImg.height);
            })
        }

    })(jQuery);
}


$(function () {
    $(".product_img").jqZoom({
        selectorWidth: 30,
        selectorHeight: 30,
        viewerWidth: 400,
        viewerHeight: 300
    });
})


// Quantity increment buttons
/* $(document).ready(function () {

    $('.quantity-right-plus').click(function (e) {

        e.preventDefault();
        var quantity = parseInt($('#quantity').val());

        $('#quantity').val(quantity + 1);
    });

    $('.quantity-left-minus').click(function (e) {
        e.preventDefault();
        var quantity = parseInt($('#quantity').val());
        if (quantity > 0) {
            $('#quantity').val(quantity - 1);
        }
    });

}); */


$(document).ready(function () {
    $('.quantity-right-plus').click(function (e) {
        e.preventDefault();
        var quantityInput = $(this).siblings('.quantity');
        var quantity = parseInt(quantityInput.val());
        quantityInput.val(quantity + 1);
    });

    $('.quantity-left-minus').click(function (e) {
        e.preventDefault();
        var quantityInput = $(this).siblings('.quantity');
        var quantity = parseInt(quantityInput.val());
        if (quantity > 0) {
            quantityInput.val(quantity - 1);
        }
    });
});
