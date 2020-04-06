<template>
  <div class="base-form-coordinates" :class="[mode.toLowerCase()]">
    <div class="map-container">
      <BaseMap class="map" ref="map">
        <MapGeocode :query="query" @updated="onGeocodeForward" v-if="mode === 'AUTOMATIC'"/>
        <MapCenter @updated="onGetCenter" v-else/>
      </BaseMap>
      <img class="pin" src="@/assets/img/pin.svg" v-if="value.length">
    </div>
  </div>
</template>

<script>
import BaseMap from '@/components/BaseMap/BaseMap'
import MapGeocode from '@/components/BaseMap/components/MapGeocode/MapGeocode'
import MapCenter from '@/components/BaseMap/components/MapCenter/MapCenter'
import debounce from 'lodash/debounce'
export default {
  components: {
    BaseMap,
    MapCenter,
    MapGeocode
  },
  props: {
    value: {
      type: Array,
      required: false
    },
    address: {
      type: String,
      required: false
    },
    mode: {
      type: String,
      require: false
    }
  },
  mounted () {
    this.value.length && this.$refs['map'].flyTo(this.value)
  },
  data: () => ({
    query: null
  }),
  watch: {
    address: {
      immediate: true,
      handler (val) { this.updateQuery(val) }
    }
  },
  methods: {
    updateQuery: debounce(function (address) {
      this.query = address
    }, 500),
    onGetCenter (lngLat) {
      this.$emit('input', lngLat)
    },
    onGeocodeForward (lngLat) {
      this.$refs['map'].flyTo(lngLat)
      this.$emit('input', lngLat)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-form-coordinates {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &.automatic {
    .map-container { cursor: not-allowed }
    .map { pointer-events: none }
  }
}
.map-container {
  height: 100%;
  width: 100%;
  position: relative;
  border: solid 1px var(--color-gray-3);
  border-radius: var(--border-radius-1);
}
.pin {
  width: 16px;
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -100%);
  pointer-events: none;
}
.helper {
  font-size: 1rem;
  color: var(--color-gray-4);
  margin-top: var(--spacing-1);
  span {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
