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
  // The param() method creates a serialized representation of an array or an object.

  // The serialized values can be used in the URL query string when making an AJAX request.
  return URL + $.param(queryObject);
}

// clear articles from previous queries
function clear() {
  $("#article-section").empty();
}

$("#run-search").on("click", event => {
  // prevent the page from refreshing when search button is pressed
  event.preventDefault();

  // call the clear function
  clear();

  var queryURL = createQueryURL();
  console.log(queryURL)

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(data => {

    console.log(data);
    var numOfArticles = $("#article-count").val();
    console.log(numOfArticles)

    for (var i = 0; i < numOfArticles; i++) {
        
        var indivArticle = data.response.docs[i];

        var articleOList = $('<ol>');
        articleOList.addClass('list-group');

        $("#article-section").append(articleOList);

        var listEl = $("<li class='list-group-item list-group-item-action headline'> ")
        listEl.append("<h2>" + indivArticle.headline.main + "</h2>")
        listEl.append("<h3>" + indivArticle.byline.original + "</h3>");
        listEl.append("<h5>Section: " + indivArticle.section_name + "</h5>");

        var dates = indivArticle.pub_date.split("T")
        var pubDateAndTime = dates[0] + " " + dates[1].slice(0, -5);
        
        listEl.append("<h5>" + pubDateAndTime + "</h5>");
        listEl.append("<a href='" + indivArticle.web_url + "'>" + indivArticle.web_url + "</a>");

        articleOList.append(listEl)
    }

  });
});

$("#clear-all").on("click", clear);