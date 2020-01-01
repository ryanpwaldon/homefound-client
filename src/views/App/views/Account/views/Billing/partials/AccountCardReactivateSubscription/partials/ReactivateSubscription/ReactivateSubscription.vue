<template>
  <BaseModal @close="$emit('close')">
    <BaseText1 class="title" text="Reactivate your subscription"/>
    <BaseDivider/>
    <BaseText2 class="subcopy">
      Your card (<span class="card-brand">{{ cardBrand }}</span> ending in {{ cardLast4 }}) will be billed $74 per month starting {{ nextInvoiceAt | moment('DD MMMM YYYY') }}.
    </BaseText2>
    <BaseDivider/>
    <div class="buttons">
      <BaseFormSubmitButton class="button" text="Back" design="gray" @click.native="$emit('close')"/>
      <BaseFormSubmitButton class="button" text="Reactivate" @click.native="submit" :loading="loading"/>
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
    subscriptionId: state => state.user.subscriptionId,
    nextInvoiceAt: state => state.user.nextInvoiceAt,
    cardBrand: state => state.user.cardBrand,
    cardLast4: state => state.user.cardLast4
  }),
  methods: {
    async submit () {
      if (this.loading) return
      this.loading = true
      try {
        const user = await BillingService.reactivateSubscription(this.subscriptionId)
        this.$emit('close')
        this.$store.commit('user/setUser', user)
        this.$notify({ text: 'Successfully reactivated subscription.', type: 'success' })
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
.card-brand {
  text-transform: capitalize;
}
</style>
