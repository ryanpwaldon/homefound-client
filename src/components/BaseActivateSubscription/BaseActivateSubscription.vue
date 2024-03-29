<template>
  <div class="base-activate-subscription">
    <BaseText1 class="title" text="Activate your subscription"/>
    <BaseDivider/>
    <div class="field">
      <BaseText4 class="label" text="Plan"/>
      <div class="plan">
        <BaseText1 class="price" :text="`${BASIC_MONTHLY_PRICE} AUD`"/>
        <BaseText2 class="subcopy" text="/ month"/>
      </div>
    </div>
    <div class="field">
      <BaseText4 class="label" text="Card details"/>
      <div class="card" ref="card"/>
      <BaseText6 class="error" v-if="error">{{ error }}</BaseText6>
    </div>
    <BaseDivider/>
    <BaseFormSubmitButton class="button" text="Subscribe" @click.native="submit" :loading="loading"/>
    <BaseText2 class="subcopy" :text="`Your card will be immediately charged ${BASIC_MONTHLY_PRICE} and then billed ${BASIC_MONTHLY_PRICE} each month thereafter until cancelled.`"/>
  </div>
</template>

<script>
import UserService from '@/services/Api/services/UserService/UserService'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText2 from '@/components/BaseText2/BaseText2'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseText6 from '@/components/BaseText6/BaseText6'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import { BASIC_MONTHLY_PRICE } from '@/constants/plan/plan'
export default {
  components: {
    BaseText1,
    BaseText2,
    BaseText4,
    BaseText6,
    BaseDivider,
    BaseFormSubmitButton
  },
  props: {
    customerId: {
      type: String,
      required: true
    }
  },
  created () {
    this.BASIC_MONTHLY_PRICE = BASIC_MONTHLY_PRICE
  },
  async mounted () {
    await this.$refs['card']
    this.initCard()
  },
  data: () => ({
    stripe: null,
    elements: null,
    card: null,
    valid: false,
    error: '',
    loading: false
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
        await UserService.updateDefaultPaymentMethod(paymentMethod.id)
        const { user, accessToken } = await UserService.createSubscription()
        this.$notify({ type: 'success' })
        this.$emit('payment-success', { user, accessToken })
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
.field {
  position: relative;
  margin-bottom: var(--spacing-5);
}
.plan {
  width: 100%;
  display: flex;
  align-items: baseline;
  padding: var(--spacing-5);
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-2);
  border: solid 1px var(--color-blue-3);
}
.price {
  font-size: 2.4rem;
  margin-right: var(--spacing-1);
}
.card {
  padding: var(--spacing-2);
  border-radius: var(--border-radius-1);
  border: solid 1px var(--color-gray-3);
  &.StripeElement--focus {
    border: solid 1px var(--color-black-2);
  }
}
.button {
  margin-bottom: var(--spacing-5);
}
.subcopy {
  color: var(--color-gray-4);
  line-height: 1.5;
}
.error {
  position: absolute;
  top: 100%;
  color: var(--color-red-1);
  margin: var(--spacing-1) 0;
}
</style>
