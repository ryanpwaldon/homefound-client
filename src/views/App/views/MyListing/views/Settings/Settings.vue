<template>
  <div class="settings">
    <CardTogglePublished
      :listing-id="listing._id"
      @listing-updated="$emit('listing-updated', $event)"
      :published="listing.published"
    />
    <CardDeleteListing :listing="listing"/>
  </div>
</template>

<script>
import CardTogglePublished from './partials/CardTogglePublished/CardTogglePublished'
import CardDeleteListing from './partials/CardDeleteListing/CardDeleteListing'
export default {
  name: 'settings',
  props: {
    listing: {
      type: Object,
      required: false
    }
  },
  components: {
    CardTogglePublished,
    CardDeleteListing
  }
}
</script>

<style lang="scss" scoped>
.settings {
  display: grid;
  grid-auto-flow: row;
  grid-gap: var(--spacing-5);
}
</style>
