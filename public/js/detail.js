'use strict';

var getUrl = "http://api-ams.me/v1/api/articles/";


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
 * Function to check if the article has image or not
 * @param {*} imageSrc 
 */
function defaultImage(imageSrc) {
  if (imageSrc == null || imageSrc == "string") {
    return ($("#main-image").attr("style", "background-image:url(../../public/images/page-not-found.jpg)"));
  } else {
    return ($("#main-image").attr("style", "background-image:url("+ imageSrc +")"));
  }
}

function formatCreatedDate(createdDate) {
  var year = createdDate.substr(0, 4);
  var month = createdDate.substr(4, 2);
  var day = createdDate.substr(6, 2);
  var time = createdDate.substr(8, 2);
  var minute = createdDate.substr(10, 2);
  return ('<span>' + year + ' - ' + month + ' - ' + day + ' at ' + time + ' : '+ minute +'</span>');
}

/**
 * Function to get the detail article
 * @param {*} articleId 
 */
function getDetailArticle(articleId) {

  $.ajax({
    url: getUrl + articleId,
    type: "GET", 
    success: function(result, status, xhr) {
      $("#title").html("Newst | " + result.DATA.TITLE);
      defaultImage(result.DATA.IMAGE);
      $("#article-title").html(result.DATA.TITLE);
      $("#desc").html(result.DATA.DESCRIPTION);
      defaultAuthor(result.DATA.AUTHOR.NAME);
      $("#created-date").html(formatCreatedDate(result.DATA.CREATED_DATE));
    },
    error: function(xhr, error, status) {
      console.log(status);
    },
    complete: function(xhr, status) {
      // function to do after request completed
    } 
  })
}

/**
 * jQuery code
 */
$(document).ready(function() {
  /**
   * Get article id and display
   */
  var articleId = findGetParameter("id");
  getDetailArticle(articleId);
});