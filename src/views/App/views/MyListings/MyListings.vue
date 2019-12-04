<template>
  <LayoutCenter>
    <div class="my-listings">
      <BaseText1 text="My listings"/>
      <BaseDivider/>
      <div class="items">
        <div class="button" @click="createListing">
          <img src="@/assets/img/plus.svg">
          <BaseText2 text="New listing"/>
        </div>
        <BaseLoader class="loader" v-if="loading"/>
        <router-link
          v-for="(listing, i) in listings"
          :to="`/app/my-listings/${listing._id}`"
          :key="i">
          <BaseListingCardSeller
            class="listing"
            :address="listing.address"
            :image="listing.images[0]"
          />
        </router-link>
      </div>
    </div>
  </LayoutCenter>
</template>

<script>
import LayoutCenter from '@/layouts/LayoutCenter/LayoutCenter'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText2 from '@/components/BaseText2/BaseText2'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseListingCardSeller from '@/components/BaseListingCardSeller/BaseListingCardSeller'
import ListingService from '@/services/Api/services/ListingService/ListingService'
import BaseLoader from '@/components/BaseLoader/BaseLoader'
export default {
  name: 'my-listings',
  components: {
    LayoutCenter,
    BaseText1,
    BaseText2,
    BaseDivider,
    BaseListingCardSeller,
    BaseLoader
  },
  async mounted () {
    this.loading = true
    this.listings = await ListingService.findCreated()
    this.loading = false
  },
  data: () => ({
    listings: [],
    loading: false
  }),
  methods: {
    async createListing () {
      const listing = await ListingService.create({})
      this.$router.push(`/app/my-listing/${listing._id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.items {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: var(--spacing-5);
  > * { min-width: 0 }
}
.listing,
.button,
.loader {
  height: 200px;
}
.button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: var(--color-white-1);
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-1);
  cursor: pointer;
  img {
    margin-bottom: var(--spacing-2);
    width: 10px;
  }
}
</style>
