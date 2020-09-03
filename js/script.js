$(document).ready(function () {
  $("button#go").click(function () {
    var input = $("input.search-bar").val();
    $(".search-bar").val("");
    // $(".search-bar").attr("placeholder", "Cerca qui il tuo film");
    $(".film-list").empty();

    insertFilms(input);
  });
});

//*** FUNZIONI ***/

function insertFilms(data) {
  $.ajax({
    url: "https://api.themoviedb.org/3/search/movie",
    method: "GET",
    data: {
      api_key: "4f7e80763e605137781d4ca90a651d63",
      query: data,
      language: "it-IT",
    },
    success: function (risp) {
      if (risp.total_results == 0) {
        $(".film-list").html("Nessun risultato corrispondente a " + data);
        return;
      }
      printFilms(risp.results);
    },
    error: function () {
      alert("error");
    },
  });
}

function printFilms(data) {
  var source = $("#film-template").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < data.length; i++) {
    var context = {
      title: data[i].title,
      original_title: data[i].original_title,
      original_language: flag(data[i].original_language),
      vote_average: stellina(data[i].vote_average),
    };
    var html = template(context);
    $(".film-list").append(html);
  }
}

function stellina(n) {
  var votoInt = Math.ceil(n / 2);
  console.log(votoInt);
  var stella = "";
  for (var i = 1; i <= 5; i++) {
    if (i <= votoInt) {
      stella += '<i class="fas fa-star"></i>';
    } else {
      stella += '<i class="far fa-star"></i>';
    }
  }
  return stella;
}

function flag(lang) {
  var symb = "";
  if (lang == "it" || lang == "en") {
    symb = '<img src="img/' + lang + '.svg"/>';
  } else {
    symb = lang;
  }
  return symb;
}
