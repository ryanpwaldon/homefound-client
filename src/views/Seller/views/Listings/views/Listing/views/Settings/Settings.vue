<template>
  <div class="settings">
    <BaseText2 class="title" text="Delete listing"/>
    <BaseText2 class="subtitle" text="This listing and related data collected will be removed from our system – forever."/>
    <BaseButton class="button" text="Delete" @click.native="deleteItem"/>
  </div>
</template>

<script>
import BaseText2 from '@/components/BaseText2/BaseText2'
import BaseButton from '@/components/BaseButton/BaseButton'
import ListingService from '@/services/Api/services/ListingService/ListingService'
export default {
  name: 'settings',
  props: {
    listing: {
      type: Object,
      required: false
    }
  },
  components: {
    BaseText2,
    BaseButton
  },
  methods: {
    async deleteItem () {
      try { await ListingService.delete(this.listing._id) }
      catch (error) { console.log(error) }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: var(--spacing-1);
}
.subtitle {
  color: var(--color-gray-4);
  margin-bottom: var(--spacing-4);
}
</style>
