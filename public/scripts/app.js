// On document load:
$(() => {
  // Adds a marker to the map and pushes to the markers array.
  function addMarker(location, title, map1) {
    var marker = new google.maps.Marker({
      position: location,
      map: map1,
      title: title
    });
    var innerObj = {};
    innerObj.title = marker.title;
    innerObj.latitude = marker.getPosition().lat();
    innerObj.longitude = marker.getPosition().lng();
    markerArr.push(innerObj);
    markers.push(marker);
  }

  // Adds event listener to add pins with titles
  function addEventListener(map) {
    map.addListener('click', function (event) {
      var title = window.prompt("name this title");
      if (title) {
        addMarker(event.latLng, title, map);
        $("input[name='pins_array']").val("");
        $("input[name='pins_array']").val(JSON.stringify(markerArr));
      } else
        return;
    });
  }

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

  var markers = [];
  var markerArr = [];

  // Initializes the Map
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
      addEventListener(map);
    } else {
      console.error("google maps appears to be unready");
    }
  })

  // AJAX call to get the data from whichever map link is clicked and populate the pins on the map
  $("[id^=map]").click(function (event) {
    var id_number = this.id.slice(3);
    console.log(id_number);
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
    addEventListener(map);
    $('#map').slideToggle();
    $('.map_buttons').show('slow');
    $.ajax({
      method: "GET",
      url: `/maps/${id_number}`
    }).done((pins) => {
      pins.forEach(function (pin) {
        markers.push(new google.maps.Marker({
          position: {
            lat: Number(pin.latitude),
            lng: Number(pin.longitude)
          },
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
  $('.name_map').click(function (event) {
    $('#name_map_group').slideToggle('fast');
    $('#map_name').focus();
  })

  // closes map and clears all markers from markerarray.
  $('.close_map').click(function (event) {
    $('#map').slideToggle();
    $('.map_buttons').hide('slow');
    // $('#map').empty();
    $('#name_map_group').hide('fast');
    deleteMarkers();
  })

  $('#name_map_group').submit(function (event) {
    // event.preventDefault();
    var map_name = $('#map_name').value;
    console.log("map name from app.js: ", map_name);
    console.log(markerArr);
  })
});
