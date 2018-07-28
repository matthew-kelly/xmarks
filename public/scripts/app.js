// On document load:
$(() => {

  var markers = [];
  var markerArr = [];

  // on document load hides the map/map buttons/ and the name map form
  $('#map').hide();
  $('.map_buttons').hide();
  $('#name_map_group').hide();

  // Adds a marker to the map and pushes to the markers array.
<<<<<<< Updated upstream
  function addMarker(location, title, map1) {
    var image = {
      url: '../images/xmark.png',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(30, 32),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32)
    };
    var shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: 'poly'
    };

    var marker = new google.maps.Marker({
      position: location,
      map: map1,
      title: title,
      icon: image,
      shape: shape,
=======
  function addMarker(location, creator, title, map1) {
    var marker = new google.maps.Marker({
      position: location,
      map: map1,
      title: `${creator}: ${title}`
>>>>>>> Stashed changes
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
    map.addListener('click', function(event) {
      var title = window.prompt("name this title");
      if (title) {
        addMarker(event.latLng, title, map);
        $("input[name='pins_array']").val("");
        $("input[name='pins_array']").val(JSON.stringify(markerArr));
      }
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

  // Initializes the Map
  $('.create_map').click(function(event) {
    event.preventDefault();
    $('#map').show('fast');
    $('.map_buttons').show('fast');

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
  $("[id^=user_map]").click(function(event) {
    var id_number = this.id.slice(8);
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
    var image = {
      url: '../images/xmark.png',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(30, 32),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32)
    };
    var shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: 'poly'
    };

    addEventListener(map);
    $('#map').show('fast');
    $('.map_buttons').show('fast');
    $.ajax({
      method: "GET",
      url: `/maps/${id_number}`
    }).done((pins) => {
      pins.forEach(function(pin) {
        markers.push(new google.maps.Marker({
          position: {
            lat: Number(pin.latitude),
            lng: Number(pin.longitude)
          },
          map: map,
          title: pin.title,
          icon: image,
          shape: shape,
        }));
      });
      showMarkers();
    });
  })


  $('[id^=made]').click(function(event) {
    console.log(this.id);
    var id_number = this.id.slice(4)
    $.ajax({
      method: "GET",
      url: `/users/${id_number}/made/`
    }).done( () => {
      return;
    })
  });
  $('[id^=liked]').click(function(event) {
    var id_number = this.id.slice(5)
    $.ajax({
      method: "GET",
      url: `/users/${id_number}/likes`
    }).done( () => {
      return;
    })
  });
  $('[id^=contrib]').click(function(event) {
    var id_number = this.id.slice(7)
    $.ajax({
      method: "GET",
      url: `/user/${id_number}/contrib`
    }).done( () => {
      return;
    })
  })

  //When name_map button is clicked, slides the save map form into view and focuses it.
  $('.name_map').click(function(event) {
    $('#name_map_group').slideToggle('fast');
    $('#map_name').focus();
  })

  // closes map and clears all markers from markerarray.
  $('.close_map').click(function(event) {
    $('#map').hide('fast');
    $('.map_buttons').hide('fast');
    $('#name_map_group').hide('fast');
    deleteMarkers();
  })

  $('#name_map_group').submit(function(event) {
    var map_name = $('#map_name').value;
  })
});
