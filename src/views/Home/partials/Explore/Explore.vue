<template>
  <div class="explore">
    <div class="header">
      <div class="title">Explore our listings</div>
      <div class="subtitle">There are currently <span class="count">{{ points.length }}</span> off-market properties listed on Homefound</div>
    </div>
    <div class="map-container">
      <BaseMap class="map" :max-zoom="17" :zoom="3" :scroll-zoom="true">
        <Markers :points="points"/>
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
        <div class="copy-1">No properties in your area?</div>
        <div class="copy-2">Be the first to know when we list in new areas</div>
        <div class="form">
          <BaseFormInput placeholder="Enter your email..."/>
          <BaseButtonLarge class="button" text="Get updates" design="pink"/>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import BaseMap from '@/components/BaseMap/BaseMap'
import Markers from '@/components/BaseMap/components/Markers/Markers'
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseButtonLarge from '@/components/BaseButtonLarge/BaseButtonLarge'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import ListingService from '@/services/Api/services/ListingService/ListingService'
import { point } from '@turf/helpers'
export default {
  components: {
    BaseMap,
    BaseCard,
    BaseButtonLarge,
    BaseFormInput,
    Markers
  },
  async created () {
    await this.updatePoints()
  },
  data: () => ({
    points: []
  }),
  methods: {
    async updatePoints () {
      this.points = (await ListingService.findAllDispersedLngLats()).map(listing => point(listing.dispersedLngLat))
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
