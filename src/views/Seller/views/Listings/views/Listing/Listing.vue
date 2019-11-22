<template>
  <div class="listing">
    <template v-if="listing">
      <BaseText1 class="title" :text="listing.address || 'New listing'"/>
      <BaseNavHorizontal class="nav" :nav-items="navItems"/>
      <router-view :listing="listing"/>
    </template>
  </div>
</template>

<script>
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseNavHorizontal from '@/components/BaseNavHorizontal/BaseNavHorizontal'
import ListingService from '@/services/Api/services/ListingService/ListingService'
export default {
  name: 'listing',
  components: {
    BaseText1,
    BaseNavHorizontal
  },
  async mounted () {
    this.listing = await ListingService.findOne(this.$route.params.id)
  },
  data: () => ({
    listing: null
  }),
  computed: {
    navItems () {
      return [
        { title: 'Create', path: `/seller/listings/${this.listing._id}/create` },
        { title: 'Performance', path: `/seller/listings/${this.listing._id}/performance` },
        { title: 'Settings', path: `/seller/listings/${this.listing._id}/settings` }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.title, .nav {
  margin-bottom: var(--spacing-5);
}
</style>
