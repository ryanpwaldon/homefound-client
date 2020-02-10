<template>
  <LayoutCenter>
    <BaseLoader class="loader" v-if="loading" text="Loading content"/>
    <template v-else>
      <BaseText1 text="Saved listings"/>
      <BaseDivider/>
      <div class="items">
        <router-link v-for="listing in listings" :key="listing._id" :to="`/app/listings/${listing._id}`">
          <BaseListingCardBuyer
            class="listing"
            :listing-id="listing._id"
            :address="listing.fullAddress"
            :price="listing.price"
            :bedrooms="listing.bedrooms"
            :bathrooms="listing.bathrooms"
            :car-spaces="listing.carSpaces"
            :first-published-at="listing.firstPublishedAt"
            :image="listing.images[0]"
          />
        </router-link>
      </div>
    </template>
  </LayoutCenter>
</template>

<script>
import LayoutCenter from '@/layouts/LayoutCenter/LayoutCenter'
import BaseLoader from '@/components/BaseLoader/BaseLoader'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseListingCardBuyer from '@/components/BaseListingCardBuyer/BaseListingCardBuyer'
import UserService from '@/services/Api/services/UserService/UserService'
export default {
  name: 'saved',
  components: {
    LayoutCenter,
    BaseLoader,
    BaseText1,
    BaseDivider,
    BaseListingCardBuyer
  },
  mounted () {
    this.fetchListings()
  },
  data: () => ({
    listings: [],
    loading: true
  }),
  methods: {
    async fetchListings () {
      this.listings = await UserService.findSavedListings()
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  width: 100%;
  height: 100%;
}
.items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-gap: var(--spacing-5);
  > * { min-width: 0 }
}
</style>
