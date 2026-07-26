const scroller = scrollama();

mapboxgl.accessToken =
  'pk.eyJ1IjoicGV0YXI5MiIsImEiOiJjbXJ4bXBndXgwMTdoMnlzNjFxdThkY2duIn0.-w9izP34Eh4UHWsx4C4MDQ';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/petar92/cmrifkhvq000w01s828d2ange', 
    center: [20.9114, 44.232598],
    zoom: 5.9,
    pitch: 0,
    interactive: false
});

function updateMapLayers(activeLayers) {
    const allLayers = [
        'sanitary_landfill',
        'dep_all',
        'dep_name',
        'dep_vinca',
        'nonsanitary_active',
        'nonsanitary_disposal_methods',
        'nonsanitary_environmental_hazards',
        'nonsanitary_safety',
        'wild_municipality',
        'leskovac_name',
        'wild_5',
        'new_sanitary_landfill'
    ];

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
    scroller
        .setup({
            step: '.step',
            offset: 0.25,
            debug: false
        })
        .onStepEnter(response => {
            const el = response.element;

            const lat = parseFloat(el.getAttribute('data-lat'));
            const lng = parseFloat(el.getAttribute('data-lng'));
            const zoom = parseFloat(el.getAttribute('data-zoom'));
            const pitch = parseFloat(el.getAttribute('data-pitch')) || 0;
            const layersAttr = el.getAttribute('data-layers');

            if (!isNaN(lat) && !isNaN(lng)) {
                map.flyTo({
                    center: [lng, lat],
                    zoom: zoom,
                    pitch: pitch,
                    essential: true,
                    duration: 2000
                });
            }

            if (layersAttr) {
                const activeLayers = layersAttr.split(',').map(s => s.trim());
                updateMapLayers(activeLayers);
            }
        });

    window.addEventListener('resize', () => {
        scroller.resize();
        map.resize();
    });
});

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
    if (newIndex >= slides.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = slides.length - 1;
    }

    slides[newIndex].classList.add('active');
}
