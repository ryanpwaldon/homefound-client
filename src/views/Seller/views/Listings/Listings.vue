<template>
  <div class="listings">
    <BaseText1 text="Listings"/>
    <BaseDivider/>
    <div class="items">
      <router-link
        v-for="(listing, i) in listings"
        :to="`/seller/listings/${listing._id}`"
        :key="i">
        <BaseListingCardSeller
          class="listing"
          :address="listing.address"
          :image="listing.images[0]"
        />
      </router-link>
      <div class="button" @click="createListing">
        <img src="@/assets/img/plus.svg">
        <BaseText2 text="New listing"/>
      </div>
    </div>
  </div>
</template>

<script>
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText2 from '@/components/BaseText2/BaseText2'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseListingCardSeller from '@/components/BaseListingCardSeller/BaseListingCardSeller'
import ListingService from '@/services/Api/services/ListingService/ListingService'
export default {
  name: 'listings',
  components: {
    BaseText1,
    BaseText2,
    BaseDivider,
    BaseListingCardSeller
  },
  async mounted () {
    this.listings = await ListingService.findCreated()
  },
  data: () => ({
    listings: []
  }),
  methods: {
    async createListing () {
      const listing = await ListingService.create({})
      this.$router.push(`/seller/listings/${listing._id}`)
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
.button {
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
