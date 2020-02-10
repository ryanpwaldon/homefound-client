<template>
  <div class="listing">
    <BaseLoader class="loader" text="Loading content" v-if="loading"/>
    <div class="container" v-else>
      <LayoutCenter>
        <div class="back" @click="$router.go(-1)">
          <img src="@/assets/img/arrow.svg">
          <BaseText4 text="BACK"/>
        </div>
        <BaseText1 class="title" :text="listing.fullAddress" />
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
        <BaseGallery class="gallery" :images="listing.images"/>
        <Contact
          :listing-id="listing._id"
          :created-by="listing.createdBy"
          :name="listing.name"
          :phone="listing.phone"
          :email="listing.email"
        />
      </LayoutCenter>
      <div class="map-container">
        <BaseMap :center="listing.lngLat" :zoom="16">
          <Pin :lng-lat="listing.lngLat"/>
        </BaseMap>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutCenter from '@/layouts/LayoutCenter/LayoutCenter'
import BaseLoader from '@/components/BaseLoader/BaseLoader'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseText5 from '@/components/BaseText5/BaseText5'
import BaseGallery from '@/components/BaseGallery/BaseGallery'
import BaseMap from '@/components/BaseMap/BaseMap'
import Pin from '@/components/BaseMap/components/Pin/Pin'
import Contact from './partials/Contact/Contact'
import ListingService from '@/services/Api/services/ListingService/ListingService'
export default {
  components: {
    LayoutCenter,
    BaseLoader,
    BaseText1,
    BaseText4,
    BaseText5,
    BaseGallery,
    BaseMap,
    Pin,
    Contact
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
    listing: null,
    loading: true
  }),
  methods: {
    async getListing () {
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
}
.loader {
  width: 100%;
  height: 100%;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  > * {
    width: 50%;
    flex-shrink: 0;
  }
}
.back {
  color: var(--color-gray-4);
  margin-bottom: var(--spacing-5);
  display: flex;
  align-items: center;
  align-self: flex-start;
  cursor: pointer;
  img {
    margin-right: var(--spacing-2);
    height: 0.6em;
  }
}
.title {
  margin-bottom: var(--spacing-5);
  user-select: all;
}
.cards {
  display: grid;
  grid-gap: var(--spacing-4);
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: var(--spacing-5);
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
.gallery {
  margin-bottom: var(--spacing-5);
}
.map-container {
  position: relative;
  border-left: var(--color-gray-1) solid 1px;
}
</style>
