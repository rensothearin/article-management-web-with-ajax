'use strict';

/**
 * Reference: StackOverflow
 * @param {*} parameterName 
 */
function findGetParameter(parameterName) {
  var result = null,
      tmp = [];
  location.search
      .substr(1)
      .split("&")
      .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
  return result;
}

/**
 * Function to check if the article has author name or not
 * @param {*} name 
 */
function defaultAuthor(name) {
  if (name == null || name == "") {
    $("#author").html("Admin - Ms Panda");
  } else {
    $("#author").html(name);
  }
}

/**
 * Function to get the detail article
 * @param {*} articleId 
 */
function getDetailArticle(articleId) {
  var root = "http://api-ams.me/v1/api/articles/";
  $.ajax({
    url: root+articleId,
    type: "GET",
    success: function(result, status, xhr) {
      console.log(result);
      $("#title").html("Newst | " + result.DATA.TITLE);
      $("#main-image").attr("style", "background-image:url("+ result.DATA.IMAGE +")");
      $("#article-title").html(result.DATA.TITLE);
      $("#desc").html(result.DATA.DESCRIPTION);
      defaultAuthor(result.DATA.AUTHOR.NAME);
      $("#created-date").html(result.DATA.CREATED_DATE);
    },
    error: function(xhr, error, status) {

    },
    complete: function(xhr, status) {
      console.log(status);
    } 
  })
}


$(document).ready(function() {
  /**
   * Get article id and display
   */
  var articleId = findGetParameter("id");
  getDetailArticle(articleId);
});