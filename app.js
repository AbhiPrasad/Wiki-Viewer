"use strict";

//when button is clicked
$('#searchBtn').click(function(e) {
    var searchTerm = "";

    e.preventDefault();

    //gets value from input box
    searchTerm = $('#inputBox').val();
    console.log(searchTerm);

    //converts value to term to be used in api
    var apiSearchTerm = searchTerm.replace(" ", "%20");

    console.log(apiSearchTerm);

    var wikiAPI = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=" + apiSearchTerm + "&utf8=";
    console.log(wikiAPI);

    $.getJSON(wikiAPI).done(updateSearch).fail(errMsg);
});

//if json request fails
function errMsg(jqxhr, textStatus, err) {
    console.log("Request Failed: " + textStatus + ", " + err);
}

//if json request doesn't fail
function updateSearch(json) {
    console.log(json);

    var wikitext = JSON.stringify(json).replace(/"/g, "");

    $('#test').html(wikitext);
}