// On document load:
$(() => {

  var markers = [];
  var markerArr = [];
  var uniqueID = 500;

  // on document load hides the map/map buttons/ and the name map form
  $('#map').hide();
  $('.name_map').hide();
  $('.update_map').hide();
  $('.close_map').hide();
  $('.form-group').hide();
  $('.save_map').hide();

  // Adds a marker to the map and pushes to the markers array.
  function addMarker(location, title, map1, description) {
    console.log(location);
    var image = {
      url: '../images/xmark.png',
      // This marker is 30 pixels wide by 32 pixels high.
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

    var infowindow = new google.maps.InfoWindow({
      content: '<h1>' + title + '</h1>' + '<p>' + description + '</p>'
    });

    var marker = new google.maps.Marker({
      position: location,
      map: map1,
      title: title,
      description: description,
      icon: image,
      shape: shape,
      delete_id: uniqueID,
      draggable: true,
      dragend: function (m) {
        console.log(marker_index);
        console.log(m.latLng.lat());
      }
    });

    uniqueID++;
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

    var innerObj = {};
    innerObj.title = marker.title;
    innerObj.description = marker.description;
    innerObj.latitude = marker.getPosition().lat();
    innerObj.longitude = marker.getPosition().lng();
    innerObj.delete_id = marker.delete_id
    markerArr.push(innerObj);
    markers.push(marker);

    marker.addListener('dblclick', function() {
      console.log(markerArr);
      for (var i = 0; i < markers.length; i++) {
        if (markers[i].delete_id == marker.delete_id) {
          //Remove the marker from Map
          markers[i].setMap(null);

          //Remove the marker from array.
          markers.splice(i, 1);
          markerArr.splice(i, 1);
          $("input[name='pins_array']").val("");
          $("input[name='pins_array']").val(JSON.stringify(markerArr));
          return;
        }
      }
    });
  }

  // Adds event listener to add pins with titles
  function addEventListener(map) {
    map.addListener('click', function (event) {
      var title = window.prompt("name this title");
      var description = window.prompt("describe this place");
      if (title && description) {
        addMarker(event.latLng, title, map, description);
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
    markerArr = [];
  }

  // Initializes the Map
  $('#compass').click(function(event) {
    event.preventDefault();
    $('#map').show('fast');
    $('.name_map').prop('disabled', null).show('fast');
    $('.update_map').prop('disabled', 'true').show('fast');
    $('.close_map').show('fast');

    if (google && google.maps && google.maps.Map) {
      var Van = {
        lat: 49.2827,
        lng: -123.1207
      };
      var map = new google.maps.Map(
        document.getElementById('map'), {
          center: Van,
          zoom: 15,
          disableDefaultUI: true,
          styles: [{ "elementType": "geometry", "stylers": [{ "color": "#e7e1cb" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#523735" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f1e6" }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#c9b2a6" }] }, { "featureType": "administrative.country", "stylers": [{ "color": "#f90000" }, { "visibility": "on" }] }, { "featureType": "administrative.land_parcel", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.land_parcel", "elementType": "geometry.stroke", "stylers": [{ "color": "#dcd2be" }] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#ae9e90" }] }, { "featureType": "administrative.neighborhood", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.man_made", "elementType": "geometry.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [{ "color": "#d7bd98" }] }, { "featureType": "poi", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#93817c" }, { "weight": 1 }] }, { "featureType": "poi.attraction", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.business", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.business", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.government", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.government", "elementType": "geometry", "stylers": [{ "color": "#f31818" }] }, { "featureType": "poi.park", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#dbbd7b" }] }, { "featureType": "poi.park", "elementType": "geometry.stroke", "stylers": [{ "weight": 3.5 }] }, { "featureType": "poi.park", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#353833" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#f5f1e6" }] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#fdfcf8" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "weight": 1.5 }] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [{ "color": "#db8555" }, { "weight": 1.5 }] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry.stroke", "stylers": [{ "color": "#db8555" }] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#806b63" }] }, { "featureType": "transit", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "transit.line", "elementType": "labels.text.fill", "stylers": [{ "color": "#8f7d77" }] }, { "featureType": "transit.line", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ebe3cd" }] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#ecb028" }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#719dce" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#92998d" }] }]
        }
      );
      // This event listener will call addMarker() when the map is clicked.
      addEventListener(map);
    } else {
      console.error("google maps appears to be unready");
    }
  })

  // AJAX call to get the data from whichever map link is clicked and populate the pins on the map
  $("[id^=user_map]").click(function (event) {
    var id_number = this.id.slice(8);
    var Van = {
      lat: 49.2827,
      lng: -123.1207
    };
    var map = new google.maps.Map(
      document.getElementById('map'), {
        center: Van,
        zoom: 15,
        disableDefaultUI: true,
        styles: [{ "elementType": "geometry", "stylers": [{ "color": "#e7e1cb" }] }, { "elementType": "labels.text.fill", "stylers": [{ "color": "#523735" }] }, { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f1e6" }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#c9b2a6" }] }, { "featureType": "administrative.country", "stylers": [{ "color": "#f90000" }, { "visibility": "on" }] }, { "featureType": "administrative.land_parcel", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative.land_parcel", "elementType": "geometry.stroke", "stylers": [{ "color": "#dcd2be" }] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#ae9e90" }] }, { "featureType": "administrative.neighborhood", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.man_made", "elementType": "geometry.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [{ "color": "#d7bd98" }] }, { "featureType": "poi", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#93817c" }, { "weight": 1 }] }, { "featureType": "poi.attraction", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.business", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.business", "elementType": "geometry", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.government", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.government", "elementType": "geometry", "stylers": [{ "color": "#f31818" }] }, { "featureType": "poi.park", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#dbbd7b" }] }, { "featureType": "poi.park", "elementType": "geometry.stroke", "stylers": [{ "weight": 3.5 }] }, { "featureType": "poi.park", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#353833" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#f5f1e6" }] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#fdfcf8" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "weight": 1.5 }] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [{ "color": "#db8555" }, { "weight": 1.5 }] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry.stroke", "stylers": [{ "color": "#db8555" }] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#806b63" }] }, { "featureType": "transit", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "transit.line", "elementType": "labels.text.fill", "stylers": [{ "color": "#8f7d77" }] }, { "featureType": "transit.line", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ebe3cd" }] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#ecb028" }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#719dce" }] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#92998d" }] }]
      }
    );
    var image = {
      url: '../images/xmark.png',
      // This marker is 30 pixels wide by 32 pixels high.
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

$('#globe').click(function(event){
  $.ajax({
      method: "GET",
      url: `/maps`
    }).done((maps) => {});
})
    addEventListener(map);
    $('#map').show('fast');
    $('.name_map').prop('disabled', 'true').show('fast');
    $('.update_map').prop('disabled', null).show('fast');
    $('.close_map').show('fast');
    $.ajax({
      method: "GET",
      url: `/maps/${id_number}`
    }).done((pins) => {
      pins.forEach(function(pin) {

        var marker = new google.maps.Marker({
          position: {
            lat: Number(pin.latitude),
            lng: Number(pin.longitude)
          },
          map: map,
          title: pin.title,
          description: pin.description,
          icon: image,
          shape: shape,
          delete_id: pin.delete_id,
          draggable: true,
          dragend: function (m) {
            console.log(marker_index);
            console.log(m.latLng.lat());
            console.log("moved pin");
          }
        })

        var infowindow = new google.maps.InfoWindow({
          content: '<h1>' + pin.title + '</h1>' + '<p>' + pin.description + '</p>'
        });
        marker.addListener('click', function () {
          infowindow.open(map, marker);
        });
        var innerObj = {};
        innerObj.title = marker.title;
        innerObj.description = marker.description;
        innerObj.latitude = marker.getPosition().lat();
        innerObj.longitude = marker.getPosition().lng();
        innerObj.map_id = id_number;
        markerArr.push(innerObj);
        markers.push(marker);

        marker.addListener('dblclick', function() {
          console.log(this);
          for (var i = 0; i < markers.length; i++) {
            if (markers[i].delete_id == marker.delete_id) {
              //Remove the marker from Map
              markers[i].setMap(null);

              //Remove the marker from array.
              markers.splice(i, 1);
              markerArr.splice(i, 1);
              $("input[name='pins_array']").val("");
              $("input[name='pins_array']").val(JSON.stringify(markerArr));
              return;
            }
          }
        });
      });
      showMarkers();
    });
  })

  $("[id^=like]").click(function (event) {
    var id_number = this.id.slice(4);
    $.ajax({
      method: "POST",
      url: `/likes/${id_number}`
    }).done(() => {
      location.reload();
    })
  })

  $('[id^=made]').click(function (event) {
    var id_number = this.id.slice(4)
    $.ajax({
      method: "GET",
      url: `/users/${id_number}/made`
    }).done(() => {
      location.reload();
    })
  });
  $('[id^=liked]').click(function (event) {
    var id_number = this.id.slice(5)
    $.ajax({
      method: "GET",
      url: `/users/${id_number}/likes`
    }).done(() => {
      location.reload();
    })
  });
  $('[id^=contrib]').click(function (event) {
    var id_number = this.id.slice(7)
    $.ajax({
      method: "GET",
      url: `/users/${id_number}/contrib`
    }).done(() => {
      location.reload();
    })
  })

  //When update_map button is clicked, slides the save map form into view and focuses it.
  $('.update_map').click(function (event) {
    $('.form-group').show('fast');
    $('.save_map').show('fast');
    $('#map_name').focus();
  })

  //When name_map button is clicked, slides the save map form into view and focuses it.
  $('.name_map').click(function (event) {
    $('.form-group').show('fast');
    $('.save_map').show('fast');
    $('#map_name').focus();
  })

  // closes map and clears all markers from markerarray.
  $('.close_map').click(function (event) {
    $('#map').hide('fast');
    $('.name_map').hide('fast');
    $('.update_map').hide('fast');
    $('.close_map').hide('fast');
    $('.form-group').hide('fast');
    $('.save_map').hide('fast');
    deleteMarkers();
  })

  $('#name_map_group').submit(function (event) {
    var map_name = $('#map_name').value;
  })
});
