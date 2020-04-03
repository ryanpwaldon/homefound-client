<template>
  <BaseCard>
    <div class="container">
      <div class="content">
        <BaseText4 class="label" text="Delete this listing"/>
        <BaseText2 class="value">This action cannot be undone. Deleting is disabled for listings that have been published previously.</BaseText2>
      </div>
      <div class="spacer"/>
      <BaseButton class="button" text="Delete" @click.native="showModal = true" :design="listing.firstPublishedAt ? 'disabled' : 'gray'"/>
    </div>
    <DeleteListing :listing-id="listing._id" v-if="showModal" @close="showModal = false"/>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseText2 from '@/components/BaseText2/BaseText2'
import BaseButton from '@/components/BaseButton/BaseButton'
import DeleteListing from './partials/DeleteListing/DeleteListing'
export default {
  props: {
    listing: {
      type: String,
      required: true
    }
  },
  components: {
    BaseCard,
    BaseText4,
    BaseText2,
    BaseButton,
    DeleteListing
  },
  data: () => ({
    showModal: false
  })
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.label {
  margin-bottom: var(--spacing-2);
  color: var(--color-gray-4);
}
.value {
  line-height: 1.5;
}
.spacer {
  width: calc(2 * var(--spacing-5));
  height: 100%;
  flex-shrink: 0;
}
.button {
  flex-shrink: 0;
}
</style>
