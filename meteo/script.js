mapboxgl.accessToken = "pk.eyJ1IjoiY2lsdSIsImEiOiJjanlnc3VvZHQwNDdvM2NzMWRwazF5bHJnIn0.HpN9uKnXt0WC6hUPLB7Dag";

//defining the two styles
const allyear = "mapbox://styles/cilu/cl0zot2k1001114pbj17mcoz1";
const byyear = "mapbox://styles/cilu/cl0z83h11004q14peo7ev1vdd";

const map = new mapboxgl.Map({
  container: "map",
  style: allyear,
  center: [24, 46.2],
  maxZoom: 12,
  minZoom: 3,
});
map.on('load', () => {
  map.fitBounds([
    [20, 44.2],
    [28, 48.2]
  ]);
  
  // make a pointer cursor
  map.getCanvas().style.cursor = "default";
  
  map.addSource('dem', {
    'type': 'raster-dem',
    'url': 'mapbox://mapbox.mapbox-terrain-dem-v1'
  });
  map.addLayer({
    id: 'hillshading',
    source: 'dem',
    type: 'hillshade',
    paint: {
      "hillshade-shadow-color": "rgb(20, 36, 15)",
      "hillshade-highlight-color": "rgb(255, 219, 102)",
      "hillshade-exaggeration": 0.9
    }
  });
  
  //Hovering highlight
  map.addSource("hover", {
    type: "geojson",
    data: { type: "FeatureCollection", features: [] }
  });
  map.addLayer({
    id: "dz-hover",
    type: "circle",
    source: "hover",
    layout: {},
    paint: {
      "circle-radius": 4,
      //'circle-color': 'rgb(26, 0, 0)',
      "circle-opacity": 0,
      "circle-stroke-width":2,
      "circle-stroke-color": "rgb(255, 230, 230)"
    }
  });
        
  //Hovering interaction
  map.on('mousemove', (event) => {
    const station = map.queryRenderedFeatures(event.point, {
      layers: ['temp-overview']
    });
    document.getElementById('pd').innerHTML = station.length
    ? `<h2><b>${station[0].properties.Name}:</b></h2><h3>${station[0].properties.Months_temp} months of data</h3><h3>(from ${station[0].properties.Years_temp} years)</h3>`
    : `<p><i>(Hover over a station!)</i></p>`;
    map.getSource("hover").setData({
      type: "FeatureCollection",
      features: station.map(function (f) {
        return { type: "Feature", geometry: f.geometry };
      })
    });
  });
});

//Control buttons
map.addControl(new mapboxgl.NavigationControl(), 'top-right');

//Scale.
const scale = new mapboxgl.ScaleControl({
  maxWidth: 150, //size of the scale bar
  unit: "metric"
});
map.addControl(scale);

const layerList = document.getElementById("menu");
const inputs = layerList.getElementsByTagName("input");

//Toggle styles
for (const input of inputs) {
  input.onclick = (layer) => {
    if (layer.target.id == "allyear") {
      const map = new mapboxgl.Map({
        container: "map", // container ID
        style: allyear,
        center: [24, 46.2],
        maxZoom: 12,
        minZoom: 3,
      });
      map.on('load', () => {
        map.fitBounds([
          [20, 44.2],
          [28, 48.2]
        ]);
        
        // make a pointer cursor
        map.getCanvas().style.cursor = "default";
        
        map.addSource('dem', {
          'type': 'raster-dem',
          'url': 'mapbox://mapbox.mapbox-terrain-dem-v1'
        });
        map.addLayer({
          id: 'hillshading',
          source: 'dem',
          type: 'hillshade',
          paint: {
            "hillshade-shadow-color": "rgb(20, 36, 15)",
            "hillshade-highlight-color": "rgb(255, 219, 102)",
            "hillshade-exaggeration": 0.9
          }
        });
        
        //Hovering highlight
        map.addSource("hover", {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] }
        });

        map.addLayer({
          id: "dz-hover",
          type: "circle",
          source: "hover",
          layout: {},
          paint: {
            "circle-radius": 4,
            //'circle-color': 'rgb(26, 0, 0)',
            "circle-opacity": 0,
            "circle-stroke-width":2,
            "circle-stroke-color": "rgb(255, 230, 230)"
          }
        });
        
        //Hovering interaction
        map.on('mousemove', (event) => {
          const station = map.queryRenderedFeatures(event.point, {
            layers: ['temp-overview']
          });
          document.getElementById('pd').innerHTML = station.length
          ? `<h2><b>${station[0].properties.Name}:</b></h2><h3>${station[0].properties.Months_temp} months of data</h3><h3>(from ${station[0].properties.Years_temp} years)</h3>`
    : `<p><i>(Hover over a station!)</i></p>`;
          map.getSource("hover").setData({
            type: "FeatureCollection",
            features: station.map(function (f) {
              return { type: "Feature", geometry: f.geometry };
            })
          });
        });
      });
    }
    if (layer.target.id == "byyear") {
      const map = new mapboxgl.Map({
        container: 'map', // container element id
        style: byyear,
        center: [24, 46.2],
        maxZoom: 12,
        minZoom: 3,
      });

      //Convert data to GeoJson
      const data_url =
        "https://api.mapbox.com/datasets/v1/cilu/cl117tr7a046722mpcyttoul4/features?access_token=pk.eyJ1IjoiY2lsdSIsImEiOiJjanlnc3VvZHQwNDdvM2NzMWRwazF5bHJnIn0.HpN9uKnXt0WC6hUPLB7Dag"

      map.on('load', () => {
        map.fitBounds([
          [20, 44.2],
          [28, 48.2]
        ]);
        
        // make a pointer cursor
        map.getCanvas().style.cursor = "default";
  
        //Add hillshading
        map.addSource('dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1'
        });
        map.addLayer({
          id: 'hillshading',
          source: 'dem',
          type: 'hillshade',
          paint: {
            "hillshade-shadow-color": "rgb(20, 36, 15)",
            "hillshade-highlight-color": "rgb(255, 219, 102)",
            "hillshade-exaggeration": 0.9
          }
        });
  
        // set map bounds to Romania
        map.fitBounds([
          [20, 44.2],
          [28, 48.2]
        ]);
  
        map.addLayer({
          id: 'Temp3',
          type: 'circle',
          source: {
            type: 'geojson',
            data: data_url
          },
    
          paint: {
            'circle-radius': [
              'step',
              ['to-number', ['get', 'temp']],
              ['number', ['get', 'temp']],
              1, 6,
              2, 7,
              3, 8,
              4, 9,
              5, 10,
              6, 12,
              7, 14,
              8, 16,
              9, 17,
              10, 18,
              11, 19,
              12, 20,
            ],
            'circle-color': 'rgb(153, 0, 0)',
            'circle-opacity': 0.5
          }
        });
  
        //Set filter for first year before any interaction
        filterYear = ['==', ['get', 'Year'], "1871"]
        map.setFilter('Temp3', ['all', filterYear]);
  
        //Slider interaction
        document.getElementById('slider').addEventListener('input', (event) => {
          //Get the year value from the slider
          const year = parseInt(event.target.value);
          //Create a filter
          syear = year.toString()
          filterYear = ['==', ['get', 'Year'], syear]
          //set the map filter
          map.setFilter('Temp3', ['all', filterYear]);
    
          // update text in the UI
          document.getElementById('active-year').innerText = year;
        });
        
        //Hovering highlight
        map.addSource("hover", {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] }
        });

        map.addLayer({
          id: "dz-hover",
          type: "circle",
          source: "hover",
          layout: {},
          paint: {
            "circle-radius": 4,
            //'circle-color': 'rgb(26, 0, 0)',
            "circle-opacity": 0,
            "circle-stroke-width":2,
            "circle-stroke-color": "rgb(255, 230, 230)"
          }
        });
      });

      //Control buttons
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      //Scale.
      const scale = new mapboxgl.ScaleControl({
        maxWidth: 150, //size of the scale bar
        unit: "metric"
      });
      map.addControl(scale);

      //Hovering
      map.on('mousemove', (event) => {
        const station = map.queryRenderedFeatures(event.point, {
          layers: ['Temp3']
        });
        document.getElementById('pd').innerHTML = station.length
        ? `<h2><b>${station[0].properties.Name}:</b></h2><h3>${station[0].properties.temp} months of data</h3><h3>(in ${station[0].properties.Year})</h3>`
    : `<p><i>(Hover over a station!)</i></p>`;
        map.getSource("hover").setData({
          type: "FeatureCollection",
          features: station.map(function (f) {
            return { type: "Feature", geometry: f.geometry };
          })
        });
      });
    }
  };
}