mapboxgl.accessToken = 'pk.eyJ1IjoiY2lsdSIsImEiOiJjanlnc3VvZHQwNDdvM2NzMWRwazF5bHJnIn0.HpN9uKnXt0WC6hUPLB7Dag';
  
  const map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/cilu/cl0872wi2002314p4qc1z29tm' // replace this with your style URL
});
  
  map.on('load', () => {
  // the rest of the code will go in here

    const layers = [
"<10",
"20 ",
"30 ",
"40 ",
"50 ",
"60 ",
"70 ",
"80 ",
"90 ",
"100"
];
const colors = [
"#67001f",
"#b2182b",
"#d6604d",
"#f4a582",
"#fddbc7",
"#d1e5f0",
"#92c5de",
"#4393c3",
"#2166ac",
"#053061"
];
    
    const legend = document.getElementById('legend');

layers.forEach((layer, i) => {
const color = colors[i];
const key = document.createElement("div");
//place holder
key.className = "legend-key";
key.style.backgroundColor = color;
key.innerHTML = `${layer}`;
legend.appendChild(key);
  if (i <= 2 || i >= 7) {
key.style.color = "white";
}
});

    map.addSource("hover", {
type: "geojson",
data: { type: "FeatureCollection", features: [] }
});
map.addLayer({
id: "dz-hover",
type: "line",
source: "hover",
layout: {},
paint: {
"line-color": "white",
"line-width": 4
}
});
    
    map.on('mousemove', (event) => {
  const dzone = map.queryRenderedFeatures(event.point, {
    layers: ['glasgow-simd']
  });
  document.getElementById('pd').innerHTML = dzone.length
    ? `<h3>${dzone[0].properties.DZName}</h3><p>Rank: <strong>${dzone[0].properties.Percentv2}</strong> %</p>`
    : `<p>Hover over a data zone!</p>`;
      map.getSource("hover").setData({
type: "FeatureCollection",
features: dzone.map(function (f) {
return { type: "Feature", geometry: f.geometry };
})
});
});
});

map.addControl(new mapboxgl.NavigationControl(), "top-left");
map.addControl(
new mapboxgl.GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
trackUserLocation: true,
showUserHeading: true
}),
"top-left"
);

const geocoder = new MapboxGeocoder({
// Initialize the geocoder
accessToken: mapboxgl.accessToken, // Set the access token
mapboxgl: mapboxgl, // Set the mapbox-gl instance
marker: false, // Do not use the default marker style
placeholder: "Search for places in Glasgow", // Placeholder text for the search bar
proximity: {
longitude: 55.8642,
latitude: 4.2518
} // Coordinates of Glasgow center
});