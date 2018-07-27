//On doc load

$(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for (user of users) {
  //     $(".username").text(user.username);
  //   }
  // });

  var markers = [];
  var markerArr = [];
  //Initializes the Map
  $('.create_map').click(function (event) {
    event.preventDefault();
    $('#map').slideToggle();
    $('.map_buttons').show('slow');

    if (google && google.maps && google.maps.Map) {
      var Van = {
        lat: 49.2827,
        lng: -123.1207
      };
      var map = new google.maps.Map(
        document.getElementById('map'), {
          center: Van,
          zoom: 15,
        }
      );

      // This event listener will call addMarker() when the map is clicked.
      map.addListener('click', function (event) {
        var title = window.prompt("name this title");
        if (title) {
          addMarker(event.latLng, title);
        } else
          return;
      });

      // Adds a marker to the map and push to the array.
      function addMarker(location, title) {
        var marker = new google.maps.Marker({
          position: location,
          map: map,
          title: title
        });
        console.log(marker.getPosition().lat())
        let innerObj = {};
        innerObj.title = marker.title;
        innerObj.latitude = marker.getPosition().lat();
        innerObj.longitude = marker.getPosition().lng();
        markerArr.push(innerObj);
        markers.push(marker);
      }

      // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

    } else {
      console.error("google maps appears to be unready");
    }
  })

  $('#map').hide();
  $('.map_buttons').hide();
  $('#name_map_group').hide();

  $('.name_map').click(function (event) {
    $('#name_map_group').slideToggle('fast');
  })

  $('.delete_map').click(function (event) {
    $('#map').slideToggle();
    $('.map_buttons').hide('slow');
    $('#map').empty();
    markers = [];
  })

  $('#name_map_group').click(function (event) {
    // event.preventDefault();
    var map_name = $('#map_name').value;
    console.log("map name from app.js: ", map_name);
    console.log(markerArr);
    $.post('http://localhost:8080/maps', {
      pins: markerArr,
      map_name: map_name
    });
    // $.ajax({
    //   method: "POST",
    //   url: "/maps"
    //   data:
    // }).done((users) => {
    //   for (user of users) {
    //     $(".username").text(user.username);
    //   }
    // });
  })
});



// $("????").value(JSON.stringify(the_shit_I_want));
