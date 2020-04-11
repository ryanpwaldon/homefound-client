<template>
  <div class="explore">
    <div class="header">
      <div class="title">Explore our listings</div>
      <div class="subtitle">There are currently <span class="count">{{ geojson && geojson.features.length }}</span> off-market properties listed on Homefound</div>
    </div>
    <div class="map-container">
      <BaseMap class="map" :max-zoom="17" :scroll-zoom="true">
        <MapSource source-id="clusters" :geojson="geojson" :cluster="true"/>
        <MapImage image-id="pulse" :image-data="pulse(200, '#ff6464', '#be5643', '#ffc8c8')"/>
        <MapLayer
          type="circle"
          source-id="clusters"
          :filter="['!', ['has', 'point_count']]"
          :paint="{
            'circle-color': '#fe6464',
            'circle-stroke-color': '#be5643',
            'circle-stroke-width': 1,
            'circle-stroke-opacity': [ 'interpolate', ['exponential', 0.5], ['zoom'], 12, 1, 17, 0.5 ],
            'circle-opacity': [ 'interpolate', ['exponential', 0.5], ['zoom'], 12, 1, 17, 0.2 ],
            'circle-radius': [ 'interpolate', ['exponential', 2], ['zoom'], 12, 6, 17, 150 ]
          }"
        />
        <MapLayer
          type="symbol"
          source-id="clusters"
          :filter="['has', 'point_count']"
          :layout="{
            'icon-image': 'pulse',
            'icon-allow-overlap': true
          }"
        />
        <MapLayer
          type="symbol"
          source-id="clusters"
          :filter="['has', 'point_count']"
          :paint="{ 'text-color': '#ffffff' }"
          :layout="{
            'icon-allow-overlap': true,
            'text-field': '{point_count_abbreviated}',
            'text-font': ['SF Pro Text Semibold'],
            'text-size': 12
          }"
        />
      </BaseMap>
    </div>
    <div class="content">
      <BaseCard>
        <div class="copy-1">Sign up to unlock listings</div>
        <div class="copy-2">Start discovering off-market properties today</div>
        <router-link to="/signup/buyer">
          <BaseButtonLarge class="button" text="Get started" design="red"/>
        </router-link>
      </BaseCard>
      <BaseCard>
        <div class="copy-1">Get updates</div>
        <div class="copy-2">Be the first to know when we launch in new areas</div>
        <ValidationObserver v-slot="{ valid }">
          <form class="form" @submit.prevent="valid && submit">
            <ValidationProvider name="email" rules="required|email">
              <BaseFormInput v-model="form.email" placeholder="Enter your email..."/>
            </ValidationProvider>
            <BaseButtonLarge class="button" text="Submit" design="pink" :loading="loading"/>
          </form>
        </ValidationObserver>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import BaseMap from '@/components/BaseMap/BaseMap'
import MapSource from '@/components/BaseMap/components/MapSource/MapSource'
import MapLayer from '@/components/BaseMap/components/MapLayer/MapLayer'
import MapImage from '@/components/BaseMap/components/MapImage/MapImage'
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseButtonLarge from '@/components/BaseButtonLarge/BaseButtonLarge'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import ListingService from '@/services/Api/services/ListingService/ListingService'
import pulse from '@/components/BaseMap/components/MapImage/images/pulse'
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full'
import { featureCollection, point } from '@turf/helpers'
export default {
  components: {
    BaseMap,
    BaseCard,
    BaseButtonLarge,
    BaseFormInput,
    MapSource,
    MapLayer,
    MapImage,
    ValidationObserver,
    ValidationProvider
  },
  async created () {
    this.pulse = pulse
    await this.updateGeojson()
  },
  data: () => ({
    geojson: null,
    loading: false,
    form: {
      email: ''
    }
  }),
  methods: {
    async updateGeojson () {
      const listings = await ListingService.findAllDispersedLngLats()
      this.geojson = featureCollection(listings.map(listing => point(listing.dispersedLngLat)))
    },
    async submit () {
      if (this.loading) return
      this.loading = true
      try {
        await new Promise(resolve => this.$segment.identify({ email: this.form.email }, resolve))
        this.$notify({ type: 'success', message: 'Subscribed' })
      } catch (err) {
        console.log(err)
        this.$notify({ type: 'error' })
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.explore {
  padding: var(--spacing-10) 0;
  @include media(sm-only) {
    padding: var(--spacing-8) 0;
  }
}
.title {
  font-size: 3.5rem;
  margin-bottom: var(--spacing-4);
  font-weight: var(--font-weight-bold);
  text-align: center;
  @include media(sm-only) {
    font-size: 3rem;
    line-height: 1.3;
    margin-bottom: var(--spacing-2);
  }
}
.subtitle {
  font-size: 1.6rem;
  margin-bottom: var(--spacing-7);
  color: var(--color-gray-4);
  text-align: center;
  line-height: 1.5;
  @include media(sm-only) {
    margin-bottom: var(--spacing-5);
  }
}
.count {
  position: relative;
  display: inline-block;
  color: var(--color-black-2);
  font-weight: var(--font-weight-medium);
  &::after {
    width: 100%;
    position: absolute;
    height: 2px;
    top: 100%;
    left: 0;
    background: var(--color-black-2);
    content: '';
    @include media(sm-only) {
      display: none;
    }
  }
}
.map-container {
  height: 0;
  width: 100%;
  position: relative;
  padding-top: calc(100% / 16 * 10);
  margin-bottom: var(--spacing-5);
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-1);
  overflow: hidden;
}
.map {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.content {
  width: 100%;
  display: grid;
  grid-gap: var(--spacing-5);
  grid-template-columns: 1fr 1fr;
  @include media(sm-only) {
    grid-template-columns: 1fr;
  }
}
.copy-1 {
  font-size: 1.8rem;
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-2);
  line-height: 1.5;
}
.copy-2 {
  font-size: 1.6rem;
  color: var(--color-gray-4);
  margin-bottom: var(--spacing-4);
  line-height: 1.5;
}
.button {
  font-size: 1.4rem;
  @include media(sm-only) {
    width: 100%;
  }
}
.form {
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-gap: var(--spacing-2);
}
</style>
