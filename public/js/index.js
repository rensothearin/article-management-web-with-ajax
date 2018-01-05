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
    return ('<div class="panel-footer">No description available</div>');
  } else {
    return ('<div class="panel-footer">'+ desc +'</div>');
  }
}

function getArticles() {
  $.ajax({
    url: "http://api-ams.me/v1/api/articles?page=1&limit=30",
    type: "GET",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Authentication", "Basic QU1TQVBJQURNSU46QU1TQVBJUEBTU1dPUkQ=");
      xhr.setRequestHeader("Accept", "*/*");
    },
    success: function(result, status, xhr) {
      console.log(result);
      for(var i=0; i<10; i++) {
        $("#article div.row #f-row").append('<div class="col-md-12 col-sm-12">' +
          '<a href="detail.html?id='+ result.DATA[i].ID +'">' +
            '<div class="panel panel-primary">' +
              '<div class="panel-heading">'+ result.DATA[i].TITLE + '<span id="more"><i class="fa fa-cog" aria-hidden="true"></i></span></div>' +
              defaultImage(result.DATA[i].IMAGE) +
              defaultArticleDescription(result.DATA[i].DESCRIPTION) +
            '</div>' +
          '</a>' +
        '</div>');
      }
      for(var i=10; i<20; i++) {
        $("#article div.row #s-row").append('<div class="col-md-12 col-sm-12">' +
          '<a href="detail.html?id='+ result.DATA[i].ID +'">' +
            '<div class="panel panel-primary">' +
              '<div class="panel-heading">'+ result.DATA[i].TITLE +'<span id="more"><i class="fa fa-cog" aria-hidden="true"></i></span></div>' +
              defaultImage(result.DATA[i].IMAGE) +
              defaultArticleDescription(result.DATA[i].DESCRIPTION) +
            '</div>' +
          '</a>' +
        '</div>');
      }
      for(var i=20; i<30; i++) {
        $("#article div.row #t-row").append('<div class="col-md-12 col-sm-12">' +
          '<a href="detail.html?id='+ result.DATA[i].ID +'">' +
            '<div class="panel panel-primary">' +
              '<div class="panel-heading">'+ result.DATA[i].TITLE +
              '<span id="more"><i class="fa fa-cog" aria-hidden="true"></i></span></div>' +
              defaultImage(result.DATA[i].IMAGE) +
              defaultArticleDescription(result.DATA[i].DESCRIPTION) +
            '</div>' +
          '</a>' +
        '</div>');
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
  
  /**
   * Reference: jQueryscript.net
   * URL: https://www.jqueryscript.net/loading/Modern-Circle-Loading-Indicator-Plugin-For-jQuery-jquery-loading-js.html
   */
  $(".container #preloader-inner").loading({
    base: 0.9,
    width: 90,
    top: 20,
    left: null,
    // hide the indicator of the current element
    hide: false,
    //remove the indicator from the DOM
    destroy: false
  });  
  
  /**
   * Execute function getArticle as soon as the document finish loading DOM
   */
  getArticles();
});