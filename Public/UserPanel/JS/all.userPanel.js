$(document).ready(function () {
    $('.tabs li').click(function () {
        var tabId = $(this).data('tab');

        $('.tabs li').removeClass('active-tab');
        $('.tab-content').removeClass('show');
        
        $(this).addClass('active-tab');
        $('#' + tabId).addClass('show');
    });
});