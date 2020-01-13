<template>
  <div class="settings">
    <CardTogglePublished
      :listing-id="listing._id"
      @listing-updated="$emit('listing-updated', $event)"
      :published="listing.published"
    />
  </div>
</template>

<script>
import CardTogglePublished from './partials/CardTogglePublished/CardTogglePublished'
export default {
  name: 'settings',
  props: {
    listing: {
      type: Object,
      required: false
    }
  },
  components: {
    CardTogglePublished
  }
}
</script>
