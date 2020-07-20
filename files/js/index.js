(function () {
  getCountry();
})();

$(document).ready(function () {
  $(".confident-link").click(function () {
    $(".hidden-conf").show();
    if ($(window).height() < 760) {
      $(".conf-info").css({
        height: $(window).height() - 120,
        "overflow-y": "scroll",
      });
    }
    return false;
  });

  $(".close-conf").click(function () {
    $(".hidden-conf").hide();
    return false;
  });
  if ($("select").length) {
  } else {
    $(".c-s").css({
      display: "none",
    });
  }

  var lastPack = $(".lastpack");
  var quantity = localStorage.getItem("quantity") || 60;
  lastPack.html(quantity);
  setInterval(function () {
    if (quantity > 7) {
      lastPack.html(--quantity);
    }
    localStorage.setItem("quantity", quantity);
  }, 13000);

  var x = 6;
  $("body").mouseleave(function () {
    if (x === 6) {
      $(".popup").show();
    }
    x--;
  });

  $(".close-popup").click(function () {
    $(".popup").hide();
  });

  checkURL();
});

function getCountry() {
  const access_key = "ffb4cf2d30078fe7303d098dd3345b57";
  var countryOutput = $(".country-name");
  var callingCode;
  var countryName;
  var cityName;

  $.ajax({
    url:
      "http://api.ipstack.com/check?access_key=" + access_key + "&language=ru",

    dataType: "jsonp",
    success: function (json) {
      if (json.country_name === "Россия") {
        cityName = json.city;
        countryName = lvovich.cityIn(cityName);
      } else {
        countryName = "Странах СНГ";
      }
      countryOutput.html(countryName);
      $(".preload").addClass("preload-disabled");
      callingCode = json.location.calling_code;
      $('input[name="phone"]').val("+ " + "( " + callingCode + " )" + " - ");
    },
  });
}

function checkURL() {
  var paramVal;
  if (window.location.href.includes("?callback=")) {
    paramVal = window.location.href.charAt(
      window.location.href.indexOf("=") + 1
    );
    alert("Есть параметр callback, со значением: " + paramVal);
  }
}
