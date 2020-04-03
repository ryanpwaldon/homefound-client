<template>
  <BaseModal @close="$emit('close')">
    <BaseText1 class="title" text="Delete this listing"/>
    <BaseDivider/>
    <BaseText2 class="subcopy" text="Once you delete a listing, there is no going back. Please be certain."/>
    <BaseDivider/>
    <div class="buttons">
      <BaseFormSubmitButton class="button" text="Back" design="gray" @click.native="$emit('close')"/>
      <BaseFormSubmitButton class="button" text="Delete" design="red" @click.native="submit" :loading="loading"/>
    </div>
  </BaseModal>
</template>

<script>
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText2 from '@/components/BaseText2/BaseText2'
import BaseModal from '@/components/BaseModal/BaseModal'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import ListingService from '@/services/Api/services/ListingService/ListingService'
export default {
  components: {
    BaseText1,
    BaseText2,
    BaseModal,
    BaseDivider,
    BaseFormSubmitButton
  },
  props: {
    listingId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    loading: false
  }),
  methods: {
    async submit () {
      if (this.loading) return
      this.loading = true
      try {
        await ListingService.delete(this.listingId)
        this.$router.push('/app/my-listings')
      } catch (error) {
        this.$notify({ type: 'error' })
        console.log(error)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.subcopy {
  color: var(--color-gray-4);
  line-height: 1.5;
}
.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--spacing-4);
}
</style>
