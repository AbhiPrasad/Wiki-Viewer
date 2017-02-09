"use strict";

const SEARCH_NUM = 10;

//when button is clicked
$('#searchBtn').click(function(e) {

    $('.wiki-icon').hide();

    //empties last search
    $('#apiText').empty();

    //appends div that other divs will populate off of
    $('<div/>', {
        id: "extract-1"
    }).appendTo('#apiText');

    var searchTerm = "";

    e.preventDefault();

    //gets value from input box
    searchTerm = $('#inputBox').val();

    //converts value to term to be used in api
    var apiSearchTerm = searchTerm.replace(" ", "+");

    var wikiAPI = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&generator=search&exsentences=2&exlimit=max&exintro=1&explaintext=1&gsrnamespace=0&gsrlimit=10&gsrsearch=" + apiSearchTerm;

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

    var index = [];

    for (var x in searchList) {
        index.push(x);
    }

    //puts title and length into div
    parseDiv(searchList, index);
}

// inserts title and result divs
function parseDiv(searchList, index) {
    for (var i = 0; i < SEARCH_NUM; i++) {

        let titletx = searchList[index[i]]["title"];
        let snippettx = searchList[index[i]]["extract"];
        let pageid = searchList[index[i]]["pageid"];

        //populates divs with title and info text
        $('<div/>', {
            class: "titleText",
            id: "title" + i,
            html: "<h4>" + titletx + "</h4>",
        }).insertAfter('#extract' + (i - 1));
        $('<a/>', {
            class: "snippetText",
            id: "extract" + i,
            html: snippettx,
            href: "https://en.wikipedia.org/?curid=" + pageid,
            target: "_blank"
        }).insertAfter('#title' + i);
    }
}