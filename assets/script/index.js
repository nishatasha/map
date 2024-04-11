'use strict';

const button = document.querySelector('.trackButton');
mapboxgl.accessToken = 'pk.eyJ1IjoiYXNoYTIwMDQiLCJhIjoiY2x1dDdiemR1MDg5bzJxbXdzaDc1MGp3YiJ9.I918kjkNmLWcylf_ddUhZA';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v11',
    center: [-97.141243, 49.878429],
    zoom: 12
});


let userMarker;


// Consider asking for geolocation permissions when the map loads
map.on('load', () => {
    map.addControl(new mapboxgl.NavigationControl());
    navigator.permissions.query({ name: 'geolocation' }).then(result => {
        if (result.state === 'granted') {
            // Permissions are already granted
            console.log('Location permission granted.');
        } else if (result.state === 'prompt') {
            console.log('Location permission prompt will be shown.');
        } else {
            console.log('Location permission denied.');
        }
    });
});


function trackUserLocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = [position.coords.longitude, position.coords.latitude];
            map.flyTo({
                center: userLocation,
                zoom: 17,
                speed: 0.5, 
                curve: 2, 
                essential: true // This animation is considered essential with respect to prefers-reduced-motion
            });


            if (userMarker) userMarker.remove();
            userMarker = new mapboxgl.Marker().setLngLat(userLocation).addTo(map);
        }, () => {
            console.log('Unable to retrieve your location.');
        }, {
            enableHighAccuracy: true // Request high accuracy location
        });
    } else {
        console.log('Geolocation is not supported by your browser.');
    }
}


button.addEventListener('click', trackUserLocation);

//Function to toggle the navigation menu
const hamburger = document.querySelector('.hamburger');
const navUL = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    navUL.classList.toggle('nav-active'); // This class is toggled on and off
});