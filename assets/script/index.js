'use strict';

const button = document.querySelector('.trackButton');


// First, set your Mapbox access token - this is necessary for Mapbox services
mapboxgl.accessToken = 'pk.eyJ1IjoiYXNoYTIwMDQiLCJhIjoiY2x1dDdiemR1MDg5bzJxbXdzaDc1MGp3YiJ9.I918kjkNmLWcylf_ddUhZA';


// Initialize a new Mapbox map instance
const map = new mapboxgl.Map({
    container: 'map', // ID of the map container in HTML
    style: 'mapbox://styles/mapbox/streets-v11', // Style URL for the map
    center: [-97.141243, 49.878429], // Starting position [longitude, latitude]
    zoom: 12 // Starting zoom level
});


// Define a function to track and display the user's current location
function trackUserLocation() {
    // Check if the geolocation API is available in the navigator
    if ('geolocation' in navigator) {
        // If available, use the getCurrentPosition method to get the user's position
        navigator.geolocation.getCurrentPosition(position => {
            // Extract longitude and latitude from position object
            const userLocation = [position.coords.longitude, position.coords.latitude];

            // Use the Mapbox method 'flyTo' to smoothly transition the map to the user's location
            map.flyTo({
                center: userLocation,
                zoom: 17 
            });

            // If a marker for the user's location already exists, remove it
            if (window.userMarker) window.userMarker.remove();

            // Create a new marker at the user's location and add it to the map
            window.userMarker = new mapboxgl.Marker()
                .setLngLat(userLocation)
                .addTo(map);

        }, () => {
            // If there was an error obtaining the geolocation (e.g., user denied it), log an error message
            console.log('Unable to retrieve your location.');
        });
    } else {
        // If the geolocation API is not supported by the browser, log a message
        console.log('Geolocation is not supported by your browser.');
    }
}

button.addEventListener('click', trackUserLocation);


