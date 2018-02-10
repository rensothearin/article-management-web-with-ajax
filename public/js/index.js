'use strict';

var getUrl = "http://api-ams.me/v1/api/articles?";

/**
 * Function to check if #f-row has children or not
 */
function isNoChildren() {
  var segment = $("div#f-row").children().length;
  if (segment == 0) {
    return true;
  } else {
    return false;
  }
}

/**
 * Function to make the footer stick to bottom while there's no element child in #f-row
 */
function stickFooterToBottom() {
  if (isNoChildren()) {
    $("footer").css("position", "absolute");
  } else {
    $("footer").css("position", "relative");
  }
}

/**
 * Function to make footer to stick to bottom whilte there's no element and while resize windows
 */
function stickFooterToBottomWhileResizeWindow() {
  $(window).resize(function() {
    if(isNoChildren()) {
      $("footer").css("position", "relative");
    } else {
      $("footer").css("position", "relative");
    }
  });
}

function localStorage(page) {
  if (typeof(Storage) !== "undefined") {
    console.log("Code for localStorage/sessionStorage.");
    $("#a-article").click(function() {
      sessionStorage.setItem("store-article", getArticles());
      sessionStorage.setItem("store-pagination", getArticlePagination(page));
    });
    window.onpopstate = function() {
      sessionStorage.getItem("store-article");
      sessionStorage.getItem("store-pagination");
    }
  }  else {
    cosole.log("Sorry! No Web Storage support...");
  }
}

/**
 * Function to check if the article has image or not
 * @param {*} imageSrc 
 */
function defaultImage(imageSrc) {
  if (imageSrc == null || imageSrc == "string") {
    return ('<div><img class="article-image img img-responsive" src="../../public/images/page-not-found.jpg" alt="Image"></div>');
  } else {
    return ('<div class="article-image img" style="background-size: cover; background-image: url('+ imageSrc +')"></div>');
  }
}

/**
 * Function to shorten the article description in order to beatifully shows on page
 * @param {*} desc 
 */
function shortenArticleDescription(desc) {
  if (desc == null) {
    return ('<div class="panel-footer">No description available</div>');
  }
  else if (desc.lenght > 0 && desc.length <= 255) {
    return ('<div class="panel-footer">'+ desc +'</div>');
  } else {
    var shortenDesc = desc.substr(0, 255);
    return ('<div class="panel-footer">'+ shortenDesc +'... </div>');
  }
}

/**
 * Function to check if the article has author or not
 * @param {*} name 
 * @param {*} createdDate 
 */
function authorAndPublishedDate(name, createdDate) {
  var year = createdDate.substr(0, 4);
  var month = createdDate.substr(4, 2);
  var day = createdDate.substr(6, 2);
  var time = createdDate.substr(8, 2);
  var minute = createdDate.substr(10, 2);

  if (name == null || name == "") {
    return ('<div class="panel-footer author-date">Author: Ms. Panda' +
            '<br><span>Published date: ' + year + ' - ' + month + ' - ' + 
            day + ' at ' + time + ' : '+ minute +'</span></div>');
  } else {
    return ('<div class="panel-footer author-date">Author: '+ name + 
            '<br><span>Published date: ' + year + ' - ' + month + ' - ' + day + ' at ' +
            time + ' : '+ minute +'</span></div>');
  }
}

function searchArticle() {
  
  $("#search").on("keyup", function() {
    console.log("Search Article function is executed");
  });
}

/**
 * Function to get articles
 */
function getArticles() {

  $.ajax({
    url: getUrl + "page=1&limit=15",
    type: "GET",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Authentication", "Basic QU1TQVBJQURNSU46QU1TQVBJUEBTU1dPUkQ=");
      xhr.setRequestHeader("Accept", "*/*");

    },
    success: function(result, status, xhr) {
      for(var i=0; i<5; i++) {
        $("#article div.row #f-row").append('<div class="col-md-12 col-sm-12">' +
          '<a id="a-article" href="detail.html?id='+ result.DATA[i].ID +'">' +
            '<div class="panel panel-primary">' +
              '<div class="panel-heading">'+ result.DATA[i].TITLE + 
              '<span id="more" title="More option">...</span></div>' +
              defaultImage(result.DATA[i].IMAGE) +
              shortenArticleDescription(result.DATA[i].DESCRIPTION) +
              authorAndPublishedDate(result.DATA[i].AUTHOR.NAME, result.DATA[i].CREATED_DATE) +
            '</div>' +
          '</a>' +
        '</div>');
      }
      for(var i=5; i<10; i++) {
        $("#article div.row #s-row").append('<div class="col-md-12 col-sm-12">' +
          '<a id="a-article" href="detail.html?id='+ result.DATA[i].ID +'">' +
            '<div class="panel panel-primary">' +
              '<div class="panel-heading">'+ result.DATA[i].TITLE +
              '<span id="more" title="More option">...</span></div>' +
              defaultImage(result.DATA[i].IMAGE) +
              shortenArticleDescription(result.DATA[i].DESCRIPTION) +
              authorAndPublishedDate(result.DATA[i].AUTHOR.NAME, result.DATA[i].CREATED_DATE) +
            '</div>' +
          '</a>' +
        '</div>');
      }
      for(var i=10; i<15; i++) {
        $("#article div.row #t-row").append('<div class="col-md-12 col-sm-12">' +
          '<a id="a-article" href="detail.html?id='+ result.DATA[i].ID +'">' +
            '<div class="panel panel-primary">' +
              '<div class="panel-heading">'+ result.DATA[i].TITLE +
              '<span id="more" title="More option">...</span></div>' +
              defaultImage(result.DATA[i].IMAGE) +
              shortenArticleDescription(result.DATA[i].DESCRIPTION) +
              authorAndPublishedDate(result.DATA[i].AUTHOR.NAME, result.DATA[i].CREATED_DATE) +
            '</div>' +
          '</a>' +
        '</div>');
      }
    }, 
    error: function(xhr, status, error) {
      console.log(status);
    },
    complete: function(xhr, status) {
      // function to do after request completed
    }
  });
}

/**
 * Function to get article in pagination
 * @param {*} page 
 */
function getArticlePagination(page) {

  $.ajax({
    url: getUrl + "page=" + page + "&limit=15",
    type: "GET",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Authentication", "Basic QU1TQVBJQURNSU46QU1TQVBJUEBTU1dPUkQ=");
      xhr.setRequestHeader("Accept", "*/*");
    },
    success: function(result, status, xhr) {
      var lengthOfResultData = result.DATA.length;
      
      try {
        for(var i=0; i<5; i++) {
          $("#article div.row #f-row").append('<div class="col-md-12 col-sm-12">' +
            '<a id="a-article" href="detail.html?id='+ result.DATA[i].ID +'">' +
              '<div class="panel panel-primary">' +
                '<div class="panel-heading">'+ result.DATA[i].TITLE + 
                '<span id="more" title="More option">...</span></div>' +
                defaultImage(result.DATA[i].IMAGE) +
                shortenArticleDescription(result.DATA[i].DESCRIPTION) +
                authorAndPublishedDate(result.DATA[i].AUTHOR.NAME, result.DATA[i].CREATED_DATE) +
              '</div>' +
            '</a>' +
          '</div>');
        }
        for(var i=5; i<10; i++) {
          $("#article div.row #s-row").append('<div class="col-md-12 col-sm-12">' +
            '<a id="a-article" href="detail.html?id='+ result.DATA[i].ID +'">' +
              '<div class="panel panel-primary">' +
                '<div class="panel-heading">'+ result.DATA[i].TITLE + 
                '<span id="more" title="More option">...</span></div>' +
                defaultImage(result.DATA[i].IMAGE) +
                shortenArticleDescription(result.DATA[i].DESCRIPTION) +
                authorAndPublishedDate(result.DATA[i].AUTHOR.NAME, result.DATA[i].CREATED_DATE) +
              '</div>' +
            '</a>' +
          '</div>');
        }
        for(var i=10; i<15; i++) {
          $("#article div.row #t-row").append('<div class="col-md-12 col-sm-12">' +
            '<a id="a-article" href="detail.html?id='+ result.DATA[i].ID +'">' +
              '<div class="panel panel-primary">' +
                '<div class="panel-heading">'+ result.DATA[i].TITLE +
                '<span id="more" title="More option">...</span></div>' +
                defaultImage(result.DATA[i].IMAGE) +
                shortenArticleDescription(result.DATA[i].DESCRIPTION) +
                authorAndPublishedDate(result.DATA[i].AUTHOR.NAME, result.DATA[i].CREATED_DATE) +
              '</div>' +
            '</a>' +
          '</div>');
        }
      } catch(e) {
        // handle if there's error in block try
      }

    }, 
    error: function(xhr, status, error) {
      console.log(status);
    },
    complete: function(xhr, status) {
      // function to do after request completed
    }
  });
}

/**
 * jQuery code
 */
$(document).ready(function() {

  // pagination
  var page = 1;

  localStorage();
  searchArticle();

  $(document).ajaxStart(function() {
    /**
    * Stick footer to bottom page
    */
    stickFooterToBottom();
    stickFooterToBottomWhileResizeWindow();

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
  });
  
  /**
   * Execute function getArticle as soon as the document finish loading DOM
   */
  getArticles();

  $(document).ajaxComplete(function() {
    /**
    * Stick footer to bottom page
    */
    stickFooterToBottom();
    stickFooterToBottomWhileResizeWindow();

    /**
     * Reference: jQueryscript.net
     * URL: https://www.jqueryscript.net/loading/Modern-Circle-Loading-Indicator-Plugin-For-jQuery-jquery-loading-js.html
     */
    $(".container #preloader-inner").loading({
      base: 0,
      width: 0,
      top: 0,
      left: null,
      // hide the indicator of the current element
      hide: true,
      //remove the indicator from the DOM
      destroy: true
    });
  });

  /**
   * Pagination
   */
  $("#load-more").click(function(e) {
    e.preventDefault();
    page++;
    getArticlePagination(page);
  });

});