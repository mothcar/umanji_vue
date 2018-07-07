<template>
  <div>
    <map-loader
      :map-config="mapConfig"
      :apiKey="api_key"
    >
      <template v-for="marker in markers">
        <child-marker :position="marker" />
      </template>
    </map-loader>
  </div>
</template>

<script>
import MapLoader from "./MapLoader.vue"
import ChildMarker from './ChildMarker'

export default {
  props: {
    markers: Array
  },
  data(){
    return {
      mapConfig: {
        zoom: 12,
        center: this.markers[0]
      },
      api_key: p_env.map_api_key
    }
  },
  components: {
    MapLoader,
    ChildMarker
  }
}
</script>
