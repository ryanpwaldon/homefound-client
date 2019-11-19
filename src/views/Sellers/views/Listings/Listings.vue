<template>
  <div class="listings">
    <BaseText1 text="Listings"/>
    <BaseDivider/>
    <div class="items">
      <BaseListingCard
        class="listing"
        v-for="(listing, i) in listings"
        :address="listing.address"
        :image="listing.images[0]"
        :id="listing._id"
        :key="i"
      />
      <router-link class="button" to="/sellers/listings/listing">
        <img src="@/assets/img/plus.svg">
        <BaseText2 text="New listing"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText2 from '@/components/BaseText2/BaseText2'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseListingCard from '@/components/BaseListingCard/BaseListingCard'
import ListingService from '@/services/Api/services/ListingService/ListingService'
export default {
  components: {
    BaseText1,
    BaseText2,
    BaseDivider,
    BaseListingCard
  },
  async mounted () {
    this.listings = await ListingService.findCreated()
  },
  data: () => ({
    listings: []
  })
}
</script>

<style lang="scss" scoped>
.items {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: var(--spacing-5);
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
  img {
    margin-bottom: var(--spacing-2);
    width: 10px;
  }
}
</style>
