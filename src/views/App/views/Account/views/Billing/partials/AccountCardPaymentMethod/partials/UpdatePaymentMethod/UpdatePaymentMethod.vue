<template>
  <BaseModal @close="$emit('close')">
    <BaseText1 class="title" text="Update your payment method"/>
    <BaseDivider/>
    <BaseText4 class="label" text="Card details"/>
    <div class="card" ref="card"/>
    <BaseDivider/>
    <div class="buttons">
      <BaseButton text="Cancel" @click.native="$emit('close')"/>
      <BaseButton text="Save" design="black" :loading="loading" @click.native="submit"/>
    </div>
  </BaseModal>
</template>

<script>
import BillingService from '@/services/Api/services/BillingService/BillingService'
import BaseButton from '@/components/BaseButton/BaseButton'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseModal from '@/components/BaseModal/BaseModal'
import { mapState } from 'vuex'
export default {
  components: {
    BaseDivider,
    BaseButton,
    BaseText1,
    BaseText4,
    BaseModal
  },
  mounted () {
    this.initCard()
  },
  data: () => ({
    loading: false,
    valid: false
  }),
  computed: mapState('user', {
    customerId: state => state.user.customerId
  }),
  methods: {
    initCard () {
      this.stripe = window.Stripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY)
      this.elements = this.stripe.elements()
      this.card = this.elements.create('card', { style: {
        base: {
          fontSmoothing: 'antialiased',
          fontSize: getComputedStyle(document.body).getPropertyValue('1.4rem'),
          color: getComputedStyle(document.body).getPropertyValue('--color-black-2'),
          fontFamily: getComputedStyle(document.body).getPropertyValue('--font-1'),
          '::placeholder': { color: getComputedStyle(document.body).getPropertyValue('--color-gray-4') }
        },
        invalid: {
          color: getComputedStyle(document.body).getPropertyValue('--color-red-1'),
          iconColor: getComputedStyle(document.body).getPropertyValue('--color-red-1')
        }
      } })
      this.card.mount(this.$refs['card'])
      this.card.on('change', ({ complete, error }) => {
        this.error = (error && error.message) || ''
        this.valid = complete
      })
    },
    async submit () {
      if (this.loading || !this.valid) return
      this.loading = true
      try {
        const { paymentMethod } = await this.stripe.createPaymentMethod({ type: 'card', card: this.card })
        const user = await BillingService.updateCustomerPaymentMethod(this.customerId, paymentMethod.id)
        this.$store.commit('user/setUser', user)
        this.$notify({ text: 'Successfully updated payment method', type: 'success' })
      } catch (err) { console.log(err) }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.label {
  margin-bottom: var(--spacing-2);
}
.card {
  padding: var(--spacing-2);
  border-radius: var(--border-radius-1);
  border: solid 1px var(--color-gray-3);
}
.buttons {
  display: flex;
  justify-content: flex-end;
  > *:not(:last-child) {
    margin-right: var(--spacing-2);
  }
}
</style>
