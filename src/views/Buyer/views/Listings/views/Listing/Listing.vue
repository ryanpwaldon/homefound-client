<template>
  <div class="listing" v-if="listing">
    <div class="content-container">
      <div class="content">
        <BaseText4 class="subtitle" text="BACK TO SEARCH"/>
        <BaseText1 class="title" :text="listing.address" />
      </div>
    </div>
    <div class="map-container">
      <BaseMap>
        <Pin :lng-lat="listing.lngLat"/>
      </BaseMap>
    </div>
  </div>
</template>

<script>
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseMap from '@/components/BaseMap/BaseMap'
import Pin from '@/components/BaseMap/components/Pin/Pin'
import ListingService from '@/services/Api/services/ListingService/ListingService'
export default {
  components: {
    BaseText4,
    BaseText1,
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
.subtitle {
  color: var(--color-gray-4);
  margin-bottom: var(--spacing-5);
}
.title {
  margin-bottom: var(--spacing-5);
}
.map-container {
  position: relative;
  border-left: var(--color-gray-1) solid 1px;
}
</style>
