<template>
  <BaseCard>
    <div class="container">
      <div class="content">
        <BaseText2 class="label" text="Published"/>
        <BaseText2 class="value">Published listings will be visible in search results. If disabled, this listing will only visible to yourself.</BaseText2>
      </div>
      <div class="spacer"/>
      <BaseFormToggle class="toggle" :value="published" :async-func="updateListingPublishedState"/>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseText2 from '@/components/BaseText2/BaseText2'
import BaseFormToggle from '@/components/BaseFormToggle/BaseFormToggle'
import ListingService from '@/services/Api/services/ListingService/ListingService'
export default {
  props: {
    listingId: {
      type: String,
      required: true
    },
    published: {
      type: Boolean,
      required: true
    }
  },
  components: {
    BaseCard,
    BaseText2,
    BaseFormToggle
  },
  methods: {
    async updateListingPublishedState (state) {
      try {
        const listing = await ListingService.update(this.listingId, { published: state })
        this.$emit('listing-updated', listing)
      } catch (err) { console.log(err) }
    }
  }
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
  margin-bottom: var(--spacing-1);
  color: var(--color-black-2);
}
.value {
  color: var(--color-gray-4);
  line-height: 1.5;
}
.spacer {
  width: calc(2 * var(--spacing-5));
  height: 100%;
  flex-shrink: 0;
}
.toggle {
  flex-shrink: 0;
}
</style>
