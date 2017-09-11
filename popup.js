$(function() {

    // Check if sprung application is working and show correspdonding text
    $.get(SPRUNG_REST_API + "/test", function(data) {
        var statusRunning = $(".status-running");
        var statusNotRunning = $(".status-not-running");
        statusRunning.show();
        statusNotRunning.hide();
    });

});