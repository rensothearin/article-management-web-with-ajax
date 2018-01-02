'use strict';

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
        $("#article div.row").append('<div class="col-sm-4">' +
          '<div class="panel panel-primary">' +
            '<div class="panel-heading">BLACK FRIDAY DEAL</div>' +
            '<div class="panel-body"><img src="../../public/images/default-image.jpg" class="img-responsive" style="width:100%" alt="Image"></div>' +
            '<div class="panel-footer">Buy 50 mobiles and get a gift card</div>' +
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