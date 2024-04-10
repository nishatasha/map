'use strict';

const button = document.querySelector('.trackButton');
let userMarker; // Define user marker variable
const statusDisplay = document.getElementById('statusDisplay'); // Assume an element to display status

// Set the Mapbox access token and initialize the map
mapboxgl.accessToken = 'pk.eyJ1IjoiYXNoYTIwMDQiLCJhIjoiY2x1dDdiemR1MDg5bzJxbXdzaDc1MGp3YiJ9.I918kjkNmLWcylf_ddUhZA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-97.141243, 49.878429],
    zoom: 12
});

function checkLocationPermission() {
    // Use Permissions API to check geolocation permission status
    navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
        if (result.state === 'granted') {
            // Permission granted
            trackUserLocation();
            statusDisplay.textContent = 'Location access granted. Tracking location...';
        } else if (result.state === 'prompt') {
            // Permission not yet decided
            statusDisplay.textContent = 'Location access not yet granted. Click "Track" to allow.';
        } else if (result.state === 'denied') {
            // Permission denied
            statusDisplay.textContent = 'Location access denied.';
        }
    });
}

// Function to track user's location and display the marker
function trackUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = [position.coords.longitude, position.coords.latitude];
            if (userMarker) {
                userMarker.remove();
            }
            userMarker = new mapboxgl.Marker()
                .setLngLat(userLocation)
                .addTo(map);
            map.flyTo({
                center: userLocation,
                zoom: 15,
                essential: true
            });
        }, () => {
            statusDisplay.textContent = 'Unable to retrieve your location.';
        });
    } else {
        statusDisplay.textContent = 'Geolocation is not supported by this browser.';
    }
}

// Check permission on page load
checkLocationPermission();

// Event listener for the track button
button.addEventListener('click', trackUserLocation);
