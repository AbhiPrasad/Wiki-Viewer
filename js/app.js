"use strict";

const SEARCH_NUM = 10;

//when button is clicked
$('#searchBtn').click(function(e) {

    $('#apiText').empty();

    $('<div/>', {
        id: "extract-1"
    }).appendTo('#apiText').fadeIn(300);

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

// inserts title and result divs -> remember to add page id https://en.wikipedia.org/?curid=5042916
function parseDiv(searchList, index) {
    for (var i = 0; i < SEARCH_NUM; i++) {

        var titletx = searchList[index[i]]["title"];
        var snippettx = searchList[index[i]]["extract"];


        $('<div/>', {
            class: "titleText",
            id: "title" + i,
            html: "<h4>" + titletx + "</h4>",
        }).insertAfter('#extract' + (i - 1));
        $('<a/>', {
            class: "snippetText",
            id: "extract" + i,
            html: snippettx
        }).insertAfter('#title' + i);
    }
}