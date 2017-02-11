chrome.contextMenus.create({
    title: "View Wikipedia Page",
    contexts: ["selection"],
    onclick: searchWiki
});

function searchWiki(word) {
    var wikisearchTerm = word.selectionText.replace(" ", "_");
    chrome.tabs.create({
        url: "https://en.wikipedia.org/wiki/" + wikisearchTerm
    });
}