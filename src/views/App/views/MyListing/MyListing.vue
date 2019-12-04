<template>
  <LayoutCenter>
    <div class="my-listing">
      <template v-if="listing">
        <BaseText1 class="title" :text="listing.address || 'New listing'"/>
        <BaseNavHorizontalSecondary class="nav" :nav-items="navItems"/>
        <router-view :listing="listing"/>
      </template>
    </div>
  </LayoutCenter>
</template>

<script>
import LayoutCenter from '@/layouts/LayoutCenter/LayoutCenter'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseNavHorizontalSecondary from '@/components/BaseNavHorizontalSecondary/BaseNavHorizontalSecondary'
import ListingService from '@/services/Api/services/ListingService/ListingService'
export default {
  name: 'my-listing',
  components: {
    LayoutCenter,
    BaseText1,
    BaseNavHorizontalSecondary
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
        { text: 'Create', path: `/app/my-listings/${this.listing._id}/create` },
        { text: 'Performance', path: `/app/my-listings/${this.listing._id}/performance` },
        { text: 'Settings', path: `/app/my-listings/${this.listing._id}/settings` }
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
