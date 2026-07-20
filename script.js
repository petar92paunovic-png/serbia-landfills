// Mapbox Access Token
mapboxgl.accessToken = 'pk.eyJ1IjoicGV0YXI5MiIsImEiOiJjbXJ0dWZwMTUwNzM2MndzNXpybHYxYWduIn0.lw4CZAdqTwqyAP0qZyKCzg';

// Initialize Mapbox map instance
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/petar92/cmrifkhvq000w01s828d2ange',
    center: [20.9114, 44.0165],
    zoom: 6,
    pitch: 0
});

// Array containing all vector/data layer IDs configured in Mapbox Studio
const allLayers = [
    'sanitary_landfill',
    'dep_duboko',
    'dep_vinca',
    'nonsanitary_active',
    'dep_bubanj_nis',
    'nonsanitary_disposal_methods',
    'nonsanitary_environmental_hazards',
    'dep_jovanovac_kragujevac',
    'nonsanitary_safety',
    'dep_bpalanka',
    'wild_municipality',
    'sanitary_landfills',
    'cyrcle_leskovac',
    'wild_5',
    'dep_radinac',
    'new_sanitary_landfill'
];

// Helper function to toggle layer visibility based on active step requirements
function showOnly(activeLayers) {
    allLayers.forEach(layer => {
        if (map.getLayer(layer)) {
            if (activeLayers.includes(layer)) {
                map.setLayoutProperty(layer, 'visibility', 'visible');
            } else {
                map.setLayoutProperty(layer, 'visibility', 'none');
            }
        }
    });
}

map.on('load', () => {
    // Initialize Scrollama for scrollytelling interaction
    const scroller = scrollama();

    scroller
        .setup({
            step: '.step',
            offset: 0.5,
            debug: false
        })
        .onStepEnter(response => {
            const el = response.element;
            const lat = parseFloat(el.getAttribute('data-lat'));
            const lng = parseFloat(el.getAttribute('data-lng'));
            const zoom = parseFloat(el.getAttribute('data-zoom'));
            const pitch = parseFloat(el.getAttribute('data-pitch'));
            const layers = el.getAttribute('data-layers').split(',').map(s => s.trim());

            // Smoothly transition map camera to new focus coordinates
            map.flyTo({
                center: [lng, lat],
                zoom: zoom,
                pitch: pitch,
                essential: true,
                duration: 2000
            });

            // Update visible layers for the active step
            showOnly(layers);
        });

    // Recalculate Scrollama trigger points on window resize
    window.addEventListener('resize', scroller.resize);
});

// Helper function for navigating inline image slider/galleries
function moveSlide(galleryId, direction) {
    const gallery = document.getElementById(galleryId);
    if (!gallery) return;
    
    const slides = gallery.querySelectorAll('.gallery-slides img');
    let activeIndex = -1;

    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            activeIndex = index;
            slide.classList.remove('active');
        }
    });

    let newIndex = activeIndex + direction;
    if (newIndex >= slides.length) newIndex = 0;
    if (newIndex < 0) newIndex = slides.length - 1;

    slides[newIndex].classList.add('active');
}
