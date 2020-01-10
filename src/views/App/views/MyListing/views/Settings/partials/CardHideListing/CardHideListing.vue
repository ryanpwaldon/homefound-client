<template>
  <BaseCard>
    <div class="container">
      <div class="content">
        <BaseText4 class="label" text="Hide listing"/>
        <BaseText5 class="value" text="This listing will be hidden from search results"/>
      </div>
      <BaseFormToggle :value="hidden" :async-func="updateListingHiddenState"/>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseText5 from '@/components/BaseText5/BaseText5'
import BaseFormToggle from '@/components/BaseFormToggle/BaseFormToggle'
import ListingService from '@/services/Api/services/ListingService/ListingService'
export default {
  props: {
    listingId: {
      type: String,
      required: true
    },
    hidden: {
      type: Boolean,
      required: true
    }
  },
  components: {
    BaseCard,
    BaseText4,
    BaseText5,
    BaseFormToggle
  },
  methods: {
    async updateListingHiddenState (state) {
      try {
        const listing = await ListingService.update(this.listingId, { hidden: state })
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
  margin-bottom: var(--spacing-2);
  color: var(--color-gray-4);
}
</style>
