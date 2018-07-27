//On doc load

$(() => {
  var markers = [];
  var markerArr = [];

  //Initializes the Map
  $('.create_map').click(function(event) {
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
      map.addListener('click', function(event) {
        var title = window.prompt("name this title");
        if (title) {
          addMarker(event.latLng, title);
          $("input[name='pins_array']").val("");
          $("input[name='pins_array']").val(JSON.stringify(markerArr));
          console.log("pins_array from app.js: ", markerArr);
        } else
          return false;
      });

      // Adds a marker to the map and push to the array.
      function addMarker(location, title) {
        var marker = new google.maps.Marker({
          position: location,
          map: map,
          title: title
        });
        let innerObj = {};
        innerObj.title = marker.title;
        innerObj.latitude = marker.getPosition().lat();
        innerObj.longitude = marker.getPosition().lng();
        markerArr.push(innerObj);
        markers.push(marker);
      }
    } else {
      console.error("google maps appears to be unready");
    }
  })

  //AJAX call to get the data from whichever MAP link is clicked and populate the pins on the map
  $('#map1').click(function(event) {
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
    console.log(markers)
    $('#map').slideToggle();
    $('.map_buttons').show('slow');
    $.ajax({
      method: "GET",
      url: "/maps/2"
    }).done((pins) => {
      pins.forEach(function(pin) {
        markers.push(new google.maps.Marker({
          position: { lat:  Number(pin.latitude), lng: Number(pin.longitude) },
          map: map,
          title: pin.title,
        }));
      });
      showMarkers();
    });
  })

  // on document load hides the map/map buttons/ and the name map form
  $('#map').hide();
  $('.map_buttons').hide();
  $('#name_map_group').hide();

  //When name_map button is clicked, slides the save map form into view and focuses it.
  $('.name_map').click(function(event) {
    $('#name_map_group').slideToggle('fast');
    $('#map_name').focus();
  })


  // closes map and clears all markers from markerarray.
  $('.close_map').click(function(event) {
    $('#map').slideToggle();
    $('.map_buttons').hide('slow');
    // $('#map').empty();
    $('#name_map_group').hide('fast');
    deleteMarkers();
  })

  $('#name_map_group').submit(function(event) {
    // event.preventDefault();
    var map_name = $('#map_name').value;
    console.log("map name from app.js: ", map_name);
    console.log(markerArr);
    // $.post('http://localhost:8080/maps', {
    //   pins: markerArr,
    //   map_name: map_name
    // });
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

  // function initMap() {
  //   var myLatLng = { lat: -25.363, lng: 131.044 };

  //   var map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 4,
  //     center: myLatLng
  //   });
  // };
  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }

  // Shows any markers currently in the array.
  function showMarkers() {
    setMapOnAll(map);
  }

  // Deletes all markers in the array by removing references to them.
  function deleteMarkers() {
    clearMarkers();
    markers = [];
  }
});




// [
// {
// id: 1,
// title: "starbucks",
// latitude: "49.2827",
// longitude: "-123.1207",
// user_id: 1,
// map_id: 1
// },
// {
// id: 2,
// title: "tim hortons",
// latitude: "49.2825",
// longitude: "-123.1214",
// user_id: 2,
// map_id: 1
// }

// ]



// var marker = new google.maps.Marker({
//   position: myLatLng,
//   map: map,
//   title: 'Hello World!'
// });
