<template>
  <LayoutCenter>
    <BaseLoader class="loader" v-if="loading" text="Loading content"/>
    <div class="my-listing" v-else>
      <div class="badges">
        <BaseBadge :text="listing.published ? 'Published' : 'Unpublished'" :design="listing.published ? 'green' : 'yellow'"/>
        <BaseBadge v-if="listing.marketStatus" :text="listing.marketStatus === 'ON' ? 'On-market' : 'Off-market'" :design="listing.marketStatus === 'ON' ? 'red' : 'green'"/>
        <router-link :to="`/app/listings/${listing._id}`" target="_blank" :style="listing.publishable ? { } : { pointerEvents: 'none', opacity: 0.5 }">
          <BaseBadge design="gray" text="Preview" :icon="require('@/assets/img/clickout.svg')"/>
        </router-link>
      </div>
      <BaseText1 class="title" :text="listing.fullAddress || 'New listing'"/>
      <BaseNavHorizontalSecondary class="nav" :nav-items="navItems"/>
      <router-view :listing="listing" @listing-updated="listing = $event"/>
    </div>
  </LayoutCenter>
</template>

<script>
import LayoutCenter from '@/layouts/LayoutCenter/LayoutCenter'
import BaseLoader from '@/components/BaseLoader/BaseLoader'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseBadge from '@/components/BaseBadge/BaseBadge'
import BaseNavHorizontalSecondary from '@/components/BaseNavHorizontalSecondary/BaseNavHorizontalSecondary'
import ListingService from '@/services/Api/services/ListingService/ListingService'
export default {
  name: 'my-listing',
  components: {
    LayoutCenter,
    BaseLoader,
    BaseText1,
    BaseBadge,
    BaseNavHorizontalSecondary
  },
  async mounted () {
    this.listing = await ListingService.findOne(this.$route.params.id)
    this.loading = false
  },
  data: () => ({
    listing: null,
    loading: true
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
.my-listing {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.title, .nav {
  margin-bottom: var(--spacing-5);
}
.badges {
  display: flex;
  margin-bottom: var(--spacing-5);
  > *:not(:last-child) { margin-right: var(--spacing-3) }
}
.loader {
  width: 100%;
  height: 100%;
}
</style>
