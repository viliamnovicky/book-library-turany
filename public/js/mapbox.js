export const displayMap = () => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoidmlsaWFtbm92aWNreSIsImEiOiJjbGYwMThxenIwNHJpM3F0NTBmbHhiNmg2In0.tUwpY9_7AGy6jElppCtbKA';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/viliamnovicky/clf02mhw7002x01mo90q36uny',
    center: [21.6550259, 49.0989784],
    //zoom: 10
  });

  const bounds = new mapboxgl.LngLatBounds(
    {lng: 21.6560259, lat: 49.0999784},
    {lng: 21.6560259, lat: 49.0979784},
    {lng: 21.6540259, lat: 49.0999784},
    {lng: 21.6540259, lat: 49.0979784},
  );
  const marker = document.createElement('div');
  marker.className = 'marker';

  new mapboxgl.Marker({
    element: marker,
    anchor: 'bottom',
  }).setLngLat({lng: 21.6550259, lat: 49.0989784}).addTo(map);

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
