<template>
  <BaseModal @close="$emit('close')">
    <BaseText1 class="title" text="Cancel your subscription"/>
    <BaseDivider/>
    <BaseText2 class="subcopy" text="You will no longer be charged for this subscription. You may continue using Homefound until the end of your billing period."/>
    <BaseDivider/>
    <div class="buttons">
      <BaseFormSubmitButton class="button" text="Back" design="gray" @click.native="$emit('close')"/>
      <BaseFormSubmitButton class="button" text="Cancel subscription" @click.native="submit" :loading="loading"/>
    </div>
  </BaseModal>
</template>

<script>
import BillingService from '@/services/Api/services/BillingService/BillingService'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText2 from '@/components/BaseText2/BaseText2'
import BaseModal from '@/components/BaseModal/BaseModal'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import { mapState } from 'vuex'
export default {
  components: {
    BaseText1,
    BaseText2,
    BaseModal,
    BaseDivider,
    BaseFormSubmitButton
  },
  data: () => ({
    loading: false
  }),
  computed: mapState('user', {
    subscriptionId: state => state.user.subscriptionId
  }),
  methods: {
    async submit () {
      if (this.loading) return
      this.loading = true
      try {
        const user = await BillingService.cancelSubscription(this.subscriptionId)
        this.$emit('close')
        this.$store.commit('user/setUser', user)
        this.$notify({ text: 'Success', type: 'success' })
      } catch (err) { console.log(err) }
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
