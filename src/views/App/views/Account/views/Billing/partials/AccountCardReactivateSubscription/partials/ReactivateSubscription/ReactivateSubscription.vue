<template>
  <BaseModal @close="$emit('close')">
    <BaseText1 class="title" text="Reactivate your subscription"/>
    <BaseDivider/>
    <BaseText2 class="subcopy">
      Your card (<span class="card-brand">{{ cardBrand }}</span> ending in {{ cardLast4 }}) will be billed ${{ BASIC_MONTHLY_PRICE }} per month starting {{ nextInvoiceAt | moment('DD MMMM YYYY') }}.
    </BaseText2>
    <BaseDivider/>
    <div class="buttons">
      <BaseFormSubmitButton class="button" text="Back" design="gray" @click.native="$emit('close')"/>
      <BaseFormSubmitButton class="button" text="Reactivate" design="black" @click.native="submit" :loading="loading"/>
    </div>
  </BaseModal>
</template>

<script>
import UserService from '@/services/Api/services/UserService/UserService'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText2 from '@/components/BaseText2/BaseText2'
import BaseModal from '@/components/BaseModal/BaseModal'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import { BASIC_MONTHLY_PRICE } from '@/constants/plan/plan'
import { mapState } from 'vuex'
export default {
  components: {
    BaseText1,
    BaseText2,
    BaseModal,
    BaseDivider,
    BaseFormSubmitButton
  },
  created () {
    this.BASIC_MONTHLY_PRICE = BASIC_MONTHLY_PRICE
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
        const { user, accessToken } = await UserService.reactivateSubscription()
        this.$emit('close')
        this.$store.dispatch('user/loginSuccess', { user, accessToken })
        this.$notify({ text: 'Subscription reactivated', type: 'success' })
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
