<template>
  <BaseCard>
    <div class="container">
      <div class="content">
        <BaseText4 class="label" text="Next invoice"/>
        <BaseText5 class="value">
          <template v-if="!subscriptionCancelled">Your card will be billed ${{ BASIC_MONTHLY_PRICE }} on {{ nextInvoiceAt | moment('DD MMMM YYYY') }}.</template>
          <template v-else>Your subscription has been cancelled and will end on {{ nextInvoiceAt | moment('DD MMMM YYYY') }}.</template>
        </BaseText5>
      </div>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseText5 from '@/components/BaseText5/BaseText5'
import BaseText4 from '@/components/BaseText4/BaseText4'
import { mapState } from 'vuex'
import { BASIC_MONTHLY_PRICE } from '@/constants/plan/plan'
export default {
  components: {
    BaseCard,
    BaseText5,
    BaseText4
  },
  created () {
    this.BASIC_MONTHLY_PRICE = BASIC_MONTHLY_PRICE
  },
  computed: mapState('user', {
    nextInvoiceAt (state) {
      return state.user.nextInvoiceAt
    },
    subscriptionCancelled (state) {
      return state.user.roles.includes(this.$getRole('BUYER_SUBSCRIPTION_CANCELLED'))
    }
  })
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
