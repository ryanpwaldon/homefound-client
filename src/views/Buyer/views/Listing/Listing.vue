<template>
  <div class="listing" v-if="listing">
    <div class="content-container">
      <div class="content">
        <router-link class="back" to="/buyer/listings">
          <img src="@/assets/img/arrow.svg">
          <BaseText4 text="BACK TO SEARCH"/>
        </router-link>
        <BaseText1 class="title" :text="listing.address" />
        <div class="cards">
          <div class="card">
            <BaseText4 class="label" text="Features"/>
            <BaseText5 class="features">
              <span>{{ listing.bedrooms }}</span> <img src="@/assets/img/bed.svg">
              <span>{{ listing.bathrooms }}</span> <img src="@/assets/img/bath.svg">
              <span>{{ listing.carSpaces }}</span> <img src="@/assets/img/car.svg">
            </BaseText5>
          </div>
          <div class="card">
            <BaseText4 class="label" text="Price"/>
            <BaseText5>$ {{ listing.price | numeral('0,0') }}</BaseText5>
          </div>
          <div class="card">
            <BaseText4 class="label" text="Posted"/>
            <BaseText5 :text="listing.createdAt | moment('from', 'now')"/>
          </div>
        </div>
        <BaseGallery :images="listing.images"/>
      </div>
    </div>
    <div class="map-container">
      <BaseMap :center="listing.lngLat" :zoom="16">
        <Pin :lng-lat="listing.lngLat"/>
      </BaseMap>
    </div>
  </div>
</template>

<script>
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseText5 from '@/components/BaseText5/BaseText5'
import BaseGallery from '@/components/BaseGallery/BaseGallery'
import BaseMap from '@/components/BaseMap/BaseMap'
import Pin from '@/components/BaseMap/components/Pin/Pin'
import ListingService from '@/services/Api/services/ListingService/ListingService'
export default {
  components: {
    BaseText1,
    BaseText4,
    BaseText5,
    BaseGallery,
    BaseMap,
    Pin
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.getListing()
  },
  data: () => ({
    listing: null
  }),
  methods: {
    async getListing () {
      this.loading = true
      this.listing = await ListingService.findOne(this.id)
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.listing {
  width: 100%;
  height: 100%;
  display: flex;
  > * {
    width: 50%;
    flex-shrink: 0;
  }
}
.content-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  background: var(--color-gray-2);
  overflow: auto;
}
.content {
  width: 100%;
  max-width: 600px;
  margin: var(--spacing-5);
}
.back {
  color: var(--color-gray-4);
  margin-bottom: var(--spacing-5);
  display: flex;
  align-items: center;
  img {
    margin-right: var(--spacing-2);
    height: 0.6em;
  }
}
.title {
  margin-bottom: var(--spacing-5);
}
.cards {
  display: grid;
  grid-gap: var(--spacing-4);
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: var(--spacing-4);
}
.card {
  width: 100%;
  background: var(--color-white-1);
  box-shadow: var(--box-shadow-1);
  border-radius: var(--border-radius-1);
  padding: var(--spacing-4);
}
.label {
  color: var(--color-gray-4);
  margin-bottom: var(--spacing-2);
}
.features {
  display: flex;
  align-items: center;
}
.features span {
  margin-right: var(--spacing-1);
}
.features img {
  height: 0.9em;
  margin-right: var(--spacing-2);
}
.map-container {
  position: relative;
  border-left: var(--color-gray-1) solid 1px;
}
</style>
