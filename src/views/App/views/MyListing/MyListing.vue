<template>
  <LayoutCenter>
    <div class="my-listing">
      <template v-if="listing">
        <div class="badges">
          <BaseBadge :text="listingState.text" :design="listingState.design"/>
          <router-link :to="`/app/listings/${listing._id}`" target="_blank" v-if="listing.publishable">
            <BaseBadge design="gray-dark" text="Preview" :icon="require('@/assets/img/clickout.svg')"/>
          </router-link>
        </div>
        <BaseText1 class="title" :text="listing.address || 'New listing'"/>
        <BaseNavHorizontalSecondary class="nav" :nav-items="navItems"/>
        <router-view :listing="listing" @listing-updated="listing = $event"/>
      </template>
    </div>
  </LayoutCenter>
</template>

<script>
import LayoutCenter from '@/layouts/LayoutCenter/LayoutCenter'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseBadge from '@/components/BaseBadge/BaseBadge'
import BaseNavHorizontalSecondary from '@/components/BaseNavHorizontalSecondary/BaseNavHorizontalSecondary'
import ListingService from '@/services/Api/services/ListingService/ListingService'
export default {
  name: 'my-listing',
  components: {
    LayoutCenter,
    BaseText1,
    BaseBadge,
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
    },
    listingState () {
      if (this.listing.published) return { text: 'Published', design: 'green' }
      return { text: 'Unpublished', design: 'gray' }
    }
  }
}
</script>

<style lang="scss" scoped>
.title, .nav {
  margin-bottom: var(--spacing-5);
}
.badges {
  display: flex;
  margin-bottom: var(--spacing-5);
  > *:not(:last-child) { margin-right: var(--spacing-3) }
}
</style>
