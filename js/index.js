$(document).ready(function(){
    UI = {
        allToggle: $("#toggle-all"),
        onlineToggle: $("#toggle-online"),
        offlineToggle: $("#toggle-offline"),
        allText: $("all"),
        onlineText: $("#online"),
        offlineText: $("#offline")
    };

    UI.onlineToggle.hover(function () {
            UI.onlineToggle.animate({marginLeft: "0"}, 200);
            UI.onlineText.show();
        }, function () {
            UI.onlineToggle.animate({marginLeft: "60"}, 200);
            UI.onlineText.hide();
        }
    );

    UI.offlineToggle.hover(function () {
            UI.offlineToggle.animate({marginLeft: "0"}, 200);
            UI.offlineText.show();
        }, function () {
            UI.offlineToggle.animate({marginLeft: "60"}, 200);
            UI.offlineText.hide();
        }
    );

});