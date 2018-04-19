<template>
  <div class="map">
    <slot></slot>
    <search-vue />
    <login-vue />
  </div>
</template>

<script>
import store, { CHECK_LOGIN, MOVE } from '../store';
import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import proj from 'ol/proj';
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import Feature from 'ol/feature';
import Point from 'ol/geom/point';
import Style from 'ol/style/style';
import IconStyle from 'ol/style/icon';
import SearchVue from './Search';
import LoginVue from './Login';
import { DPI, getDpi } from '../constants';
import OSM from 'ol/source/osm';
import XYZ from 'ol/source/xyz';
import debounce from 'debounce';
import Circle from 'ol/geom/circle';
import { getFriends } from '../model/friends';
import { postLocations } from '../services/geoloc';
import Text from 'ol/style/text';
import Fill from 'ol/style/fill';
import Stroke from 'ol/style/stroke';

function distance([lat1, lon1], [lat2, lon2]) {
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a =
    0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;
  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

const view = location => new View({ center: proj.fromLonLat(location), zoom: 12 });
const icon = 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-256.png';
const layer = () =>
  new TileLayer({
    source: new XYZ({
      url:
        'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ3JpbXUiLCJhIjoiY2pnNWEzOGp3MjM2bDJ3cXBrMmdpdXIyNiJ9.ICBxpkWQfQa7rrfiBJ36Lg'
    })
  });
/* new TileLayer({
    source: new OSM({
      attributions: [
        'All maps © <a href="https://www.opencyclemap.org/">OpenCycleMap</a>',
        OSM.ATTRIBUTION
      ],
      url:
        'https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png' +
        '?apikey=086dad2a684e4acc9f69e38829f6c9ce'
    })
  });*/

const map = (el, olview, ollayer) =>
  new Map({
    target: el,
    layers: [ollayer],
    view: olview,
    controls: []
  });

function setPoint(position, location, olmap, vector, name = 'me') {
  const point = new Point(proj.fromLonLat(location));
  const feature = new Feature({
    geometry: point,
    name: name,
    text: name
  });
  position.addFeature(feature);
}

function getFriendsForViewPort(olmap) {
  const extents = olmap.getView().calculateExtent(olmap.getSize());
  const [x1, y1, x2, y2] = extents;
  const coords1 = proj.toLonLat([x1, y1]);
  const coords2 = proj.toLonLat([x2, y2]);
  const center = proj.toLonLat(olmap.getView().getCenter()).reverse();
  const distanceX1X2 = distance(coords1, coords2);
  getFriends(center, distanceX1X2)
    .then(() => {})
    .catch(err => console.log(err));
}

export default {
  name: 'Map',
  components: {
    'search-vue': SearchVue,
    'login-vue': LoginVue
  },
  props: {},

  computed: {
    coords() {
      return this.$store.state.location;
    }
  },
  mounted() {
    this.$el.style.overflow = 'hidden';
    const olview = view(store.state.location);
    const ollayer = layer();
    const olmap = map(this.$el, olview, ollayer);
    const position = new VectorSource();
    const vector = new VectorLayer({
      source: position,
      style: feature => {
        console.log(feature);
        return new Style({
          image: new IconStyle({
            src: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-256.png',
            scale: 0.1
          }),
          text: new Text({
            offsetY: 20,
            text: feature.get('name'),
            placement: 'point',
            font: '300 15px roboto',
            textAlign: 'center',
            fill: new Fill({ color: '#212121' }),
            backgroundFill: new Fill({ color: 'rgba(250, 250, 250, 0.40)' }),
            padding: [3, 5, 3, 5]
          })
        });
      }
    });

    olmap.addLayer(vector);
    olmap.getView().on(
      'change:resolution',
      debounce(function(event) {
        getFriendsForViewPort(olmap);
      }),
      1000
    );

    navigator.geolocation.getCurrentPosition(
      location => {
        const coords = [location.coords.longitude, location.coords.latitude];
        this.move(coords);
        setPoint(position, coords, olmap, vector);
        postLocations(coords);
      },
      err => console.log(err)
    );
    function getLocationAndSendIt() {
      navigator.geolocation.getCurrentPosition(
        location => {
          const coords = [location.coords.longitude, location.coords.latitude];
          setPoint(position, coords, olmap, vector);
          postLocations(coords)
            .then(result => console.log(result))
            .catch(err => console.log(err));
          getFriendsForViewPort(olmap);
        },
        err => console.log(err)
      );
    }
    setInterval(getLocationAndSendIt, 6 * 1000);
    getLocationAndSendIt();

    store.dispatch(CHECK_LOGIN).then(isLogged => {
      if (isLogged) this.$router.push('home');
    });

    this.$store.watch(
      state => this.$store.state.location,
      newValue => {
        olview.setCenter(proj.fromLonLat(newValue));
      }
    );
    this.$store.watch(
      state => this.$store.state.friends,
      friends => {
        position.clear();
        friends.forEach(friend => {
          if (friend.shown) {
            setPoint(position, friend.location, olmap, vector, friend.name);
          }
          setPoint(position, store.state.location, olmap, vector);
        });
      }
    );
  },

  methods: {
    move(coords) {
      store.commit(MOVE, coords);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.map {
  height: 100%;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
