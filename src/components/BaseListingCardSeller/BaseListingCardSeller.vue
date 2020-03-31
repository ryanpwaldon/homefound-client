<template>
  <div class="base-listing-card-seller">
    <div class="image-container">
      <div class="image" :style="{backgroundImage: `url(${listing.images[0] + '-/resize/400x/'})`}" v-if="listing.images[0]"/>
      <div class="image backup" v-else/>
    </div>
    <div class="contents">
      <BaseText6 class="text address" :text="listing.fullAddress || 'Untitled'"/>
      <BaseDivider class="divider"/>
      <BaseText6 class="text created">
      Created {{ listing.createdAt | moment('from', 'now') }}
      </BaseText6>
      <BaseDivider class="divider"/>
      <div class="badges">
        <BaseBadge :text="listing.published ? 'Published' : 'Unpublished'" :design="listing.published ? 'green' : 'yellow'"/>
        <router-link :to="`/app/listings/${listing._id}`" :style="listing.publishable ? { } : { pointerEvents: 'none', opacity: 0.5 }" @click.native.stop>
          <BaseBadge :icon="require('@/assets/img/clickout.svg')" design="gray"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BaseText6 from '@/components/BaseText6/BaseText6'
import BaseBadge from '@/components/BaseBadge/BaseBadge'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
export default {
  components: {
    BaseText6,
    BaseBadge,
    BaseDivider
  },
  props: {
    listing: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.base-listing-card-seller {
  display: flex;
  position: relative;
  flex-direction: column;
  background: var(--color-white-1);
  border: solid 1px var(--color-gray-1);
  border-radius: var(--border-radius-1);
  overflow: hidden;
}
.image-container {
  position: relative;
  padding-top: calc(100% / 1.2);
  width: 100%;
  height: 0;
}
.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-bottom: 1px solid var(--color-gray-1);
}
.image.backup {
  background-image: url('../../assets/img/image.svg');
  background-size: 30% auto;
}
.contents {
  flex-shrink: 0;
  padding: var(--spacing-2);
}
.divider {
  margin: var(--spacing-2) 0;
}
.text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.created {
  color: var(--color-gray-4);
}
.badges {
  display: flex;
  justify-content: space-between;
  > *:not(:last-child) { margin-right: var(--spacing-3) }
}
</style>
