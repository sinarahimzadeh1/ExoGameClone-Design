$(function () {
    var minPrice = 25070000;
    var maxPrice = 455537000;

    $("#slider-range").slider({
        range: true,
        min: minPrice,
        max: maxPrice,
        values: [minPrice, maxPrice],
        slide: function (event, ui) {
            $("#amount-low").text((maxPrice - ui.values[1]).toLocaleString());
            $("#amount-high").text((maxPrice - ui.values[0]).toLocaleString());
        }
    });
    $("#amount-low").text((maxPrice - $("#slider-range").slider("values", 1)).toLocaleString());
    $("#amount-high").text((maxPrice - $("#slider-range").slider("values", 0)).toLocaleString());
});