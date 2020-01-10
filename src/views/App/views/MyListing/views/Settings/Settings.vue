<template>
  <div class="settings">
    <CardHideListing
      :listing-id="listing._id"
      @listing-updated="$emit('listing-updated', $event)"
      :hidden="listing.hidden"
    />
  </div>
</template>

<script>
import CardHideListing from './partials/CardHideListing/CardHideListing'
export default {
  name: 'settings',
  props: {
    listing: {
      type: Object,
      required: false
    }
  },
  components: {
    CardHideListing
  }
}
</script>
