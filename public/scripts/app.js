// // $(() => {
// //   $.ajax({
// //     method: "GET",
// //     url: "/api/users"
// //   }).done((users) => {
// //     for(user of users) {
// //       $("<div>").text(user.name).appendTo($("body"));
// //     }
// //   });;
// // });

$(document).ready(function() {

  function initMap() {
    var Van = { lat: 49.2827, lng: -123.1207 };
    var map = new google.maps.Map(
      document.getElementById('map'), {
        center: Van,
        zoom: 14,
      });
    var marker2 = new google.maps.Marker({ position: Van, map: map });
  }


  $('.map1')
    .click(function(event) {
      // event.preventDefault();
      const $division = $(`<div id='map'>`);
      const $map = initMap();
      $map.appendTo($division);
      $('.thisiswhere').prepend($division);
      $('#map').show();
    })

});
