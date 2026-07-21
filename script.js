const scroller = scrollama();

mapboxgl.accessToken =
  'pk.eyJ1IjoicGV0YXI5MiIsImEiOiJjbXJ0dTgzaTQwNzZuMnpzY3k4bHdsdzR3In0.2USgUYibSUrvj5LArK6E8A';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/petar92/cmrifkhvq000w01s828d2ange', 
    center: [20.9114, 44.0165],
    zoom: 6,
    pitch: 0
});

// Function to handle map layer visibility
function updateMapLayers(activeLayers) {
    // List of all map layers used in the project
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
        'cyrcle_leskovac',
        'wild_5',
        'dep_radinac',
        'new_sanitary_landfill'
    ];

    // Loop through all layers and toggle visibility based on active steps
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

// Set up scroll logic and event listeners once the map loads
map.on('load', () => {
    
    // Configure Scrollama
    scroller
        .setup({
            step: '.step', // HTML elements representing scroll steps
            offset: 0.5,   // Trigger step when it reaches 50% of the viewport height
            debug: false   // Set to true to display visual debug lines
        })
        .onStepEnter(response => {
            // response.element refers to the currently active .step element
            const el = response.element;

            // Extract coordinates and zoom attributes from HTML
            const lat = parseFloat(el.getAttribute('data-lat'));
            const lng = parseFloat(el.getAttribute('data-lng'));
            const zoom = parseFloat(el.getAttribute('data-zoom'));
            const pitch = parseFloat(el.getAttribute('data-pitch')) || 0;
            const layersAttr = el.getAttribute('data-layers');

            // Smoothly fly to the target coordinates
            if (!isNaN(lat) && !isNaN(lng)) {
                map.flyTo({
                    center: [lng, lat],
                    zoom: zoom,
                    pitch: pitch,
                    essential: true,
                    duration: 2000 // Animation duration in milliseconds
                });
            }

            // Update visible map layers for the current step
            if (layersAttr) {
                const activeLayers = layersAttr.split(',').map(s => s.trim());
                updateMapLayers(activeLayers);
            }
        });

    // Resize Scrollama triggers when the window is resized
    window.addEventListener('resize', scroller.resize);
});

// Function to control image galleries (previous/next buttons)
function moveSlide(galleryId, direction) {
    const gallery = document.getElementById(galleryId);
    if (!gallery) return;

    const slides = gallery.querySelectorAll('.gallery-slides img');
    let activeIndex = -1;

    // Find the currently active slide index
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            activeIndex = index;
            slide.classList.remove('active');
        }
    });

    // Calculate the index for the next slide
    let newIndex = activeIndex + direction;
    if (newIndex >= slides.length) {
        newIndex = 0; // Wrap around to the first image
    } else if (newIndex < 0) {
        newIndex = slides.length - 1; // Wrap around to the last image
    }

    // Display the new active slide
    slides[newIndex].classList.add('active');
}
