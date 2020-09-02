$(document).ready(function () {
  $("button#go").click(function () {
    var input = $("input.search-bar").val();
    $(".search-bar").val("");
    $(".film-list").empty();

    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      data: {
        api_key: "4f7e80763e605137781d4ca90a651d63",
        query: input,
        language: "it-IT",
      },
      success: function (data) {
        if (data.total_results == 0) {
          $(".film-list").html("Nessun risultato corrispondente a " + input);
          return;
        }

        for (var i = 0; i < data.results.length; i++) {
          var source = $("#film-template").html();
          var template = Handlebars.compile(source);

          var context = data.results[i];
          // console.log(context);
          // var context = {
          //   title: data.results[i].title,
          //   original_title: data.results[i].original_title,
          //   original_language: data.results[i].original_language,
          //   vote_average: data.results[i].vote_average,
          // };
          var html = template(context);
          $(".film-list").append(html);
        }
      },
      error: function () {
        alert("error");
      },
    });
  });
});
