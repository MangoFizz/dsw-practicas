let mapa = null;
let latitud = 19.541142;
let longitud = -96.9271873;
let latitudHome;
let longitudHome;
let transportesSelect = document.getElementById("Transporte");
let rutaCheck = document.querySelector("#Ruta");
let directionsRederer = new google.maps.DirectionsRenderer();

function dibujaMapa() {
    mapa = $('#mapa').locationpicker({
        location: { latitude: latitud, longitude: longitud },
        radius: 300,
        addressFormat: 'point_of_interest',
        inputBinding: {
            latitudeInput: $('#Latitud'),
            longitudeInput: $('#Longitud'),
            locationNameInput: $('#Localizador')
        },
        enableAutocomplete: true,
        enableReverseGeocode: true,
        onchanged: function (currentLocation, radius, isMarkerDropped) {
            latitud = currentLocation.latitude;
            longitud = currentLocation.longitude;
            distancia();
        }
    });
}

function miUbicacion() {
    let mapContext = mapa.locationpicker('map');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                latitudHome = position.coords.latitude;
                longitudHome = position.coords.longitude;
                new google.maps.Marker({
                    position: { lat: latitudHome, lng: longitudHome },
                    map: mapContext.map,
                    title: "Esta es tu ubicación actual",
                    icon: "images/home.png"
                });
                distancia();
            },
            () => {
                $('#Distancia').val("La localización no está activada.");
            }
        );
    }
    else {
        $('#Distancia').val("El navegador no soporta geolocalización.");
    }
}


function distancia() {
    let mapContext = mapa.locationpicker('map');
    const service = new google.maps.DistanceMatrixService();
    const selectedMode = document.getElementById("Transporte").value;
    const origen = { lat: latitudHome, lng: longitudHome };
    const destino = { lat: latitud, lng: longitud };
    const request = {
        origins: [origen],
        destinations: [destino],
        travelMode: google.maps.TravelMode[selectedMode],
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
    };
    service.getDistanceMatrix(request).then((response) => {
        if (response.rows.length > 0) {
            $('#Distancia').val(response.rows[0].elements[0].distance.text);
            $('#Tiempo').val(response.rows[0].elements[0].duration.text);
        }
    });
    if (rutaCheck.checked) {
        const directionsService = new google.maps.DirectionsService();
        directionsRederer.setMap(mapContext.map);

        directionsService
            .route({
                origin: origen,
                destination: destino,
                travelMode: google.maps.TravelMode[selectedMode],
            })
            .then((response) => {
                directionsRederer.setDirections(response);
            });
    } 
    else {
        directionsRederer.setMap(null);
    }
}

[transportesSelect, rutaCheck].forEach(item => {
    item.addEventListener("change", function () {
        distancia();
    });
});

[transportesSelect, rutaCheck].forEach(item => {
    item.addEventListener("change", function () {
        distancia();
    });
});

$(function () {
    dibujaMapa();
    miUbicacion();
});
