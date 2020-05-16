<template>
  <div class="explore">
    <div class="header">
      <div class="title">Explore our listings</div>
      <div class="subtitle">There are currently <span class="count">{{ geojson && geojson.features.length }}</span> off-market properties listed on Homefound</div>
    </div>
    <div class="map-container" @mouseenter="pulse = true" @mouseleave="pulse = false">
      <BaseMap class="map" :max-zoom="17" :scroll-zoom="true">
        <MapSource source-id="clusters" :geojson="geojson" :cluster="true"/>
        <MapImagePulse
          image-id="pulse"
          :circle-radius="15"
          :circle-stroke-width="1"
          :pulse-radius="20"
          fill-color="#ff6464"
          stroke-color="#be5643"
          pulse-color="#ffc8c8"
          :duration="2000"
        />
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
          :paint="{ 'text-color': '#ffffff' }"
          :layout="{
            'text-size': 12,
            'icon-image': 'pulse',
            'text-field': '{point_count_abbreviated}',
            'text-font': ['SF Pro Text Semibold'],
            'icon-allow-overlap': true
          }"
        />
      </BaseMap>
    </div>
    <div class="content">
      <BaseCard>
        <div class="copy-1">Sign up for access</div>
        <div class="copy-2">
          Get access to our off-market listings to improve your chances of finding great deals on property</div>
        <router-link to="/signup/buyer">
          <BaseButtonLarge class="button" text="Get started" design="red"/>
        </router-link>
      </BaseCard>
      <BaseCard>
        <div class="copy-1">Not in your area?</div>
        <div class="copy-2">Subscribe to our newsletter and we’ll let you know when we expand to new locations</div>
        <ValidationObserver v-slot="{ valid }">
          <form class="form" @submit.prevent="valid && submit()">
            <ValidationProvider name="email" rules="required|email">
              <BaseFormInput v-model="form.email" placeholder="Enter your email..."/>
            </ValidationProvider>
            <BaseButtonLarge class="button" text="Submit" type="submit" design="pink" :loading="loading"/>
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
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseButtonLarge from '@/components/BaseButtonLarge/BaseButtonLarge'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import ListingService from '@/services/Api/services/ListingService/ListingService'
import MapImagePulse from '@/components/BaseMap/components/MapImagePulse/MapImagePulse'
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
    MapImagePulse,
    ValidationObserver,
    ValidationProvider
  },
  async created () {
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
.title {
  font-size: 3.5rem;
  margin-bottom: var(--spacing-2);
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
  margin-bottom: var(--spacing-5);
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
  border: solid 1px var(--color-gray-1);
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
