<template>
  <div class="base-form-coordinates" :class="[mode]">
    <div class="map-container">
      <BaseMap class="map" ref="map">
        <GeocodeForward :query="query" @updated="onGeocodeForward" v-if="mode === 'automatic'"/>
        <GetCenter @updated="onGetCenter" v-else/>
      </BaseMap>
      <img class="pin" src="@/assets/img/pin.svg" v-if="value.length">
    </div>
    <div class="helper" v-if="address">
      <div v-if="mode === 'automatic'">Not the correct location? <span @click="updateMode('manual')">Set pin manually</span></div>
      <div v-else><span @click="updateMode('automatic')">Geolocate from address</span></div>
    </div>
  </div>
</template>

<script>
import BaseMap from '@/components/BaseMap/BaseMap'
import GeocodeForward from '@/components/BaseMap/components/GeocodeForward/GeocodeForward'
import GetCenter from '@/components/BaseMap/components/GetCenter/GetCenter'
import debounce from 'lodash/debounce'
export default {
  components: {
    BaseMap,
    GetCenter,
    GeocodeForward
  },
  props: {
    value: {
      type: Array,
      required: false
    },
    address: {
      type: String,
      required: false
    }
  },
  data: () => ({
    mode: 'automatic',
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
      this.$refs['map'].updateView(lngLat)
      this.$emit('input', lngLat)
    },
    updateMode (mode) {
      this.query = mode === 'automatic' ? this.address : null
      this.mode = mode
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
