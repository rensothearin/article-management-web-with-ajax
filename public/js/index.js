'use strict';

function defaultImage(imageSrc) {
  if (imageSrc == null) {
    return ('<div><img class="article-image img img-responsive" src="../../public/images/page-not-found.png" alt="Image"></div>');
  } else {
    console.log(imageSrc);
    return ('<div class="article-image img" style="background-size: cover; background-image: url('+ imageSrc +')"></div>');
  }
}

function defaultArticleDescription(desc) {
  console.log("Default description successfully executed");
  if (desc == null || desc == "") {
    return ('<div class="panel-footer">No description</div>');
  } else {
    var trimDesc = $.trim(desc).length;
    var shortenDesc = "";
    return ('<div class="panel-footer">'+ desc +'</div>');
  }
}

function getArticles() {
  $.ajax({
    url: "http://api-ams.me/v1/api/articles?page=1&limit=15",
    type: "GET",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.setRequestHeader("Authentication", "Basic QU1TQVBJQURNSU46QU1TQVBJUEBTU1dPUkQ=");
      xhr.setRequestHeader("Accept", "*/*");
    },
    success: function(result, status, xhr) {
      console.log(result);
      for(var i=0; i<result.DATA.length; i++) {
        $("#article div.row").append('<div class="col-md-4 col-sm-6">' +
          '<div class="panel panel-primary">' +
            '<div class="panel-heading">'+ result.DATA[i].TITLE +'</div>' +
            defaultImage(result.DATA[i].IMAGE) +
            defaultArticleDescription(result.DATA[i].DESCRIPTION) +
          '</div>' +
        '</div>')
      }
    }, 
    error: function(xhr, status, error) {
      console.log(error)
    },
    complete: function(xhr, status) {
      console.log("After completion")
    }
  });
}

$(document).ready(function() {
  getArticles();
});