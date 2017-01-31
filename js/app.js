"use strict";

const SEARCH_NUM = 10;

//when button is clicked
$('#searchBtn').click(function(e) {
    var searchTerm = "";

    e.preventDefault();

    //gets value from input box
    searchTerm = $('#inputBox').val();
    console.log(searchTerm);

    //converts value to term to be used in api
    var apiSearchTerm = searchTerm.replace(" ", "+");

    var wikiAPI = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&generator=search&exsentences=2&exlimit=max&exintro=1&explaintext=1&gsrnamespace=0&gsrlimit=10&gsrsearch=" + apiSearchTerm;
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

    var searchList = json.query.pages;

    console.log(searchList);

    var index = [];

    for (var x in searchList) {
        index.push(x);
    }

    console.log(searchList[index[1]]);

    // var wikitext = JSON.stringify(searchList).replace(/"/g, "");

    //  var listLength = Object.keys(searchList);

    // console.log(listLength);

    //puts title and length into div
    parseDiv(searchList, index);
    //console.log(wikitext);
}

// appends title and result divs in order to 
function parseDiv(searchList, index) {
    for (var i = 0; i < SEARCH_NUM; i++) {

        var titletx = searchList[index[i]]["title"];
        var snippettx = searchList[index[i]]["extract"];

        console.log("hello");
        $('<div/>', {
            class: "titleText",
            id: "title" + i,
            text: titletx
        }).insertAfter('#extract' + (i - 1));
        $('<br/>').insertAfter("#title" + i);
        $('<a/>', {
            class: "snippetText",
            id: "extract" + i,
            html: snippettx
        }).insertAfter('#title' + i);
    }
}