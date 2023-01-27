$("#article-number").text("Number of Articles: " + $("#article-count").val());

function createQueryURL() {
    var URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

    //Build object that holds all of the specified query parameters
    var queryObject = { "api-key": "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M" };

    queryObject.q = $("#search-term").val().trim();

    var startYear = $("#start-year").val().trim();
    var endYear = $("#end-year").val().trim();
    if (parseInt(startYear)) {
        queryObject.begin_date = startYear + "0101";
    }
    if (parseInt(endYear)) {
        queryObject.end_date = endYear + "0101";
    }

    queryObject.sort = "relevance";
    console.log($.param(queryObject))
    return URL + $.param(queryObject);

}

createQueryURL();