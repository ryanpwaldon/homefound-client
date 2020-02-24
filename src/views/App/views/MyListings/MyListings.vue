<template>
  <BaseLayoutCenter>
    <BaseLoader class="loader" v-if="loading" text="Loading content"/>
    <div class="my-listings" v-else>
      <div class="header">
        <BaseText1 text="My listings"/>
        <BaseButton text="Create listing" design="gray" @click.native="createListing"/>
      </div>
      <BaseDivider/>
      <div class="items">
        <BaseLoader class="loader" v-if="loading"/>
        <router-link
          v-for="(listing, i) in listings"
          :to="`/app/my-listings/${listing._id}`"
          :key="i">
          <BaseListingCardSeller class="listing" :listing="listing" />
        </router-link>
      </div>
    </div>
  </BaseLayoutCenter>
</template>

<script>
import BaseLayoutCenter from '@/components/BaseLayoutCenter/BaseLayoutCenter'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseButton from '@/components/BaseButton/BaseButton'
import BaseListingCardSeller from '@/components/BaseListingCardSeller/BaseListingCardSeller'
import ListingService from '@/services/Api/services/ListingService/ListingService'
import BaseLoader from '@/components/BaseLoader/BaseLoader'
export default {
  name: 'my-listings',
  components: {
    BaseLayoutCenter,
    BaseText1,
    BaseDivider,
    BaseButton,
    BaseListingCardSeller,
    BaseLoader
  },
  async mounted () {
    this.listings = (await ListingService.findCreated({ options: { limit: 1000, sort: { published: -1, createdAt: -1 } } })).docs
    this.loading = false
  },
  data: () => ({
    listings: [],
    loading: true
  }),
  methods: {
    async createListing () {
      const listing = await ListingService.create({})
      this.$router.push(`/app/my-listings/${listing._id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-gap: var(--spacing-5);
  > * { min-width: 0 }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.loader {
  width: 100%;
  height: 100%;
}
</style>
