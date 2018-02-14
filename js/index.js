var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var apiURL = "https://wind-bow.gomix.me/twitch-api";

var callURLs = channels.map(function(item){
    return apiURL+"/channels/"+ item + "?callback=?";
});

$(document).ready(function(){
    UI = {
        allBtn:{
            toggle: $("#toggle-all"),
            text: $("#all"),
            selected: true
        },
        offlineBtn:{
            toggle: $("#toggle-offline"),
            text: $("#offline"),
            selected: false
        },
        onlineBtn:{
            toggle: $("#toggle-online"),
            text: $("#online"),
            selected: false
        },

        channelsContainer: $(".channels-container")
    };

    initialisePage();
    populate();

    var btns = [UI.allBtn, UI.offlineBtn, UI.onlineBtn];
    btns.forEach(function(item, pos, arr){
        item.toggle.hover(function () {
            btnShow(item);
        }, function () {
            if(item.selected === false){
                btnHide(item);
            }
        });

        item.toggle.click(function(){
            item.selected = true;
            for(var i = 0; i < arr.length; i++){
                if(i === pos) continue;
                btnHide(arr[i]);
            }

            UI.channels.fadeOut();
            setTimeout(function(){
                UI.statusArr[pos].fadeIn();
            }, 400);

        });
    });

    

    function initialisePage(){
        channels.forEach(function(){
            var channelDiv = document.createElement("div");
            var imageDiv = document.createElement("div");
            var imgElt = document.createElement("img");
            var nameDiv = document.createElement("div");
            var nameElt = document.createElement("a");
            var statusDiv = document.createElement("div");
            var statusElt = document.createElement("span");

            channelDiv.classList.add("row", "channel");
            imageDiv.classList.add("two", "columns", "img-div");
            nameDiv.classList.add("four", "columns", "channel-details");
            statusDiv.classList.add("six", "columns", "channel-details");

            imgElt.classList.add("photo");
            nameElt.classList.add("channel-name");
            statusElt.classList.add("channel-status");

            channelDiv.appendChild(imageDiv);
            channelDiv.appendChild(nameDiv);
            channelDiv.appendChild(statusDiv);

            imageDiv.appendChild(imgElt);
            nameDiv.appendChild(nameElt);
            statusDiv.appendChild(statusElt);

            UI.channelsContainer.append(channelDiv);
        });

        UI.photos = $(".photo");
        UI.names = $(".channel-name");
        UI.status = $(".channel-status");
        UI.channels = $(".channel");
    }

    function populate(){
        channels.forEach(function(item, pos){
            $.getJSON(apiURL+"/channels/"+ item + "?callback=?", function(data){
                UI.photos[pos].setAttribute("src", data.logo);
                UI.photos[pos].setAttribute("alt", data.display_name);
                UI.names[pos].setAttribute("href", "https://www.twitch.tv/" + data.display_name);
                UI.names[pos].setAttribute("target", "_blanck");
                UI.names[pos].textContent = data.display_name; 
            });

            $.getJSON(apiURL+"/streams/"+ item + "?callback=?", function(data){
                if(data.stream){
                    UI.channels[pos].classList.add("online");
                    UI.status[pos].textContent = data.stream.game + ": " + data.stream.channel.status;
                }else{
                    UI.channels[pos].classList.add("offline");
                    UI.status[pos].textContent = "Offline";
                    UI.status[pos].classList.add("offline-text");
                }
                UI.statusArr = [$(".channel"), $(".offline") , $(".online")];
            });
        });
    }

    function btnShow(btn){
        btn.toggle.animate({marginLeft: "0"}, 200);
        btn.text.show();
    }

    function btnHide(btn){
        btn.toggle.animate({marginLeft: "60"}, 200);
        btn.text.hide();
    }

});