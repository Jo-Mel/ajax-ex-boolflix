$(document).ready(function () {
  var source = $("#film-template").html(); //**Tamplate per le prove con css */
  var template = Handlebars.compile(source);

  for (var i = 0; i < 10; i++) {
    var context = {
      title: "Ciao",
      original_title: "Ciao",
      original_language: "it",
      vote_average: stellina(5),
      type: "Film",
      poster: "https://via.placeholder.com/342x513",
    };

    var html = template(context);
    $(".film-list").append(html);
  }

  $("button#go").click(function () {
    init();
  });

  $("input.search-bar").keydown(function () {
    if (event.which == 13 || event.keyCode == 13) {
      init();
    }
  });
});

//*** FUNZIONI ***/
/**
 * type = 'tv' | 'movie'
 */

function init() {
  var input = $("input.search-bar").val();
  $(".search-bar").val("");
  // $(".search-bar").attr("placeholder", "Cosa vuoi guardare?");
  $(".film-list").empty();
  $(".tv-list").empty();

  search(input, "movie");
  search(input, "tv");
}

function search(data, type) {
  $.ajax({
    url: "https://api.themoviedb.org/3/search/" + type,
    method: "GET",
    data: {
      api_key: "4f7e80763e605137781d4ca90a651d63",
      query: data,
      language: "it-IT",
    },
    success: function (risp) {
      if (risp.total_results == 0) {
        $(".film-list").html(
          "Nessun risultato corrispondente a " + data + " " + type
        );
        return;
      }
      print(risp.results, type);
    },
    error: function () {
      alert("error");
    },
  });
}

function print(data, type) {
  var source = $("#film-template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < data.length; i++) {
    var context = {
      title: data[i].title || data[i].name,
      original_title: data[i].original_title || data[i].original_name,
      original_language: flag(data[i].original_language),
      vote_average: stellina(data[i].vote_average),
      type: type == "movie" ? "Film" : "Serie Tv", // uso l'operatore di confronto ternario
      poster:
        data[i].poster_path !== null
          ? "https://image.tmdb.org/t/p/w342" + data[i].poster_path
          : "https://via.placeholder.com/342x513",
      overview: data[i].overview.substring(0, 250) + " [...]",
    };

    var html = template(context);
    if (type == "movie") {
      $(".film-list").append(html);
    } else if (type == "tv") {
      $(".tv-list").append(html);
    }
  }
}

function stellina(n) {
  var votoInt = Math.ceil(n / 2);
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
//******* Variante fz stellina ****/

//function stellina(n) {
// var votoInt = Math.ceil(n / 2);
// var stella = "";
// var fullStar = '<i class="fas fa-star"></i>';
// var emptyStar = '<i class="far fa-star"></i>';
// stella = fullStar.repeat(votoInt) + emptyStar.repeat(5 - votoInt);
// return stella;
//}

function flag(lang) {
  var lingue = ["it", "en"];
  if (lingue.includes(lang)) {
    return '<img src="img/' + lang + '.svg"/>';
  } else {
    return lang;

    // var symb = "";                        //** Versione senza l'array di lingue */
    // if (lang == "it" || lang == "en") {
    //   symb = '<img src="img/' + lang + '.svg"/>';
    // } else {
    //   symb = lang;
    // }
    // return symb;
  }
}
