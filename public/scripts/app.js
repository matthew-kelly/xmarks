// On document load:
$(() => {

  var markers = [];
  var markerArr = [];
  // on document load hides the map/map buttons/ and the name map form
  $('#map').hide();
  $('.name_map').hide();
  $('.close_map').hide();
  $('.form-group').hide();
  $('.save_map').hide();

  // Adds a marker to the map and pushes to the markers array.
  function addMarker(location, title, map1) {
    console.log(location);
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

    // IF ITS STUPID AND IT WORKS IT'S NOT STUPID
    var locationObj = JSON.stringify(location);
    locationObj.replace(/"{"lat":/g, "").replace(/""lng":/g, "").replace(/}/g, "")
    console.log(locationObj)
    var locationArr1 = locationObj.split(':')
    var locationArr2 = locationArr1.toString().split('}');
    var locationArr3 = locationArr2.toString().split(',');
    console.log(locationArr3);
    var infowindow = new google.maps.InfoWindow({
      content :'<h1>'+ title +'</h1>' +
        '[lat, lang] : [' + locationArr3[1] + ',' + locationArr3[3] + ']' +
        '<br><button class="btn btn-default remove-marker" data-marker-lat="'+
        locationArr3[1] +'" data-marker-lng="'+locationArr3[3]+'">Delete marker</button>'
      });

    var marker = new google.maps.Marker({
      position: location,
      map: map1,
      title: title,
      icon: image,
      shape: shape,
      draggable: true,
      dragend: function(m) {
        console.log(marker_index);
        console.log(m.latLng.lat())
      }
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
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
    markerArr = [];
  }

  // Initializes the Map
  $('.create_map').click(function(event) {
    event.preventDefault();
    $('#map').show('fast');
    $('.name_map').show('fast');
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

    addEventListener(map);
    $('#map').show('fast');
    $('.name_map').show('fast');
    $('.close_map').show('fast');
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

  $("[id^=like]").click(function(event) {
    var id_number = this.id.slice(4);
    $.ajax({
      method: "POST",
      url: `/likes/${id_number}`
    }).done(() => {
      location.reload();
    })
  })

  $('[id^=made]').click(function(event) {
    var id_number = this.id.slice(4)
    $.ajax({
      method: "GET",
      url: `/users/${id_number}/made/`
    }).done(() => {
      location.reload();
    })
  });
  $('[id^=liked]').click(function(event) {
    var id_number = this.id.slice(5)
    $.ajax({
      method: "GET",
      url: `/users/${id_number}/likes`
    }).done(() => {
      location.reload();
    })
  });
  $('[id^=contrib]').click(function(event) {
    console.log(this.id);
    var id_number = this.id.slice(7)
    $.ajax({
      method: "GET",
      url: `/users/${id_number}/contrib`
    }).done(() => {
      location.reload();
    })
  })

  //When name_map button is clicked, slides the save map form into view and focuses it.
  $('.name_map').click(function(event) {
    $('.form-group').show('fast');
    $('.save_map').show('fast');
    $('#map_name').focus();
  })

  // $('.mapdiv').click('div.gmnoprint .remove-marker', function(event) {
  //   console.log($(this));
  //   event.preventDefault();
  //   // var lat = $(this).data("marker-lat");
  //   // var lng = $(this).data("marker-lng");
  //   // console.log("deleting marker ", lat, lng);
  //   $.each(map.markers, function(index, marker) {
  //   //   var m_lat = marker.getPosition().lat();
  //   //   var m_lng = marker.getPosition().lng();
  //   //   if (m_lat == lat && m_lng == lng) {
  //     map.removeMarker(map.markers[index]);
  //     // return false;
  //     // }
  //   });
  // });

  // closes map and clears all markers from markerarray.
  $('.close_map').click(function(event) {
    $('#map').hide('fast');
    $('.name_map').hide('fast');
    $('.close_map').hide('fast');
    $('.form-group').hide('fast');
    $('.save_map').hide('fast');
    deleteMarkers();
  })

  $('#name_map_group').submit(function(event) {
    var map_name = $('#map_name').value;
  })

});
