"use strict";

//when button is clicked
$('#searchBtn').click(function(e) {
    var searchTerm = "";

    e.preventDefault();

    //gets value from input box
    searchTerm = $('#inputBox').val();
    console.log(searchTerm);

    //converts value to term to be used in api
    var apiSearchTerm = searchTerm.replace(" ", "+");

    console.log(apiSearchTerm);

    var wikiAPI = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&utf8=&redirects&srsearch=" + apiSearchTerm;
    console.log(wikiAPI);

    //API call to get JSON
    $.getJSON(wikiAPI).done(updateSearch).fail(errMsg);
});

//if json request fails
function errMsg(jqxhr, textStatus, err) {
    console.log("Request Failed: " + textStatus + ", " + err);
}

//if json request doesn't fail
function updateSearch(json) {

    var searchList = json["query"]["search"];

    var listLength = searchList.length;

    var wikitext = JSON.stringify(searchList).replace(/"/g, "");

    //puts title and length into div
    parseDiv(searchList, listLength);
}

// appends title and result divs in order to 
function parseDiv(searchList, listLength) {
    for (var i = 0; i < listLength; i++) {

        var titletx = searchList[i]["title"];
        var snippettx = searchList[i]["snippet"];

        $('<div/>', {
            class: "titleText",
            id: "title" + i,
            text: titletx
        }).insertAfter('#snippet' + (i - 1));
        $('<br/>').insertAfter("#title" + i);
        $('<a/>', {
            class: "snippetText",
            id: "snippet" + i,
            html: snippettx
        }).insertAfter('#title' + i);
    }
}