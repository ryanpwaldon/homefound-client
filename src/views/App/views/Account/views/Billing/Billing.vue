<template>
  <div class="billing">
    <AccountCardReactivateSubscription v-if="subscriptionStatus === 'cancelled'"/>
    <AccountCardActivateSubscription v-if="subscriptionStatus === 'inactive'"/>
    <AccountCardCancelSubscription v-if="subscriptionStatus === 'active'"/>
    <AccountCardNextInvoice v-if="nextInvoiceAt"/>
    <AccountCardPaymentMethod v-if="hasCardDetails"/>
  </div>
</template>

<script>
import AccountCardActivateSubscription from './partials/AccountCardActivateSubscription/AccountCardActivateSubscription'
import AccountCardReactivateSubscription from './partials/AccountCardReactivateSubscription/AccountCardReactivateSubscription'
import AccountCardCancelSubscription from './partials/AccountCardCancelSubscription/AccountCardCancelSubscription'
import AccountCardNextInvoice from './partials/AccountCardNextInvoice/AccountCardNextInvoice'
import AccountCardPaymentMethod from './partials/AccountCardPaymentMethod/AccountCardPaymentMethod'
import { BUYER, BUYER_CANCELLED, BUYER_INACTIVE } from '@/roles/roles'
import { mapState } from 'vuex'
export default {
  name: 'billing',
  components: {
    AccountCardActivateSubscription,
    AccountCardReactivateSubscription,
    AccountCardCancelSubscription,
    AccountCardNextInvoice,
    AccountCardPaymentMethod
  },
  computed: {
    ...mapState('user', {
      roles: state => state.user.roles,
      hasCardDetails: state => state.user.cardBrand && state.user.cardLast4,
      nextInvoiceAt: state => state.user.nextInvoiceAt
    }),
    subscriptionStatus () {
      if (this.roles.includes(BUYER_CANCELLED)) return 'cancelled'
      if (this.roles.includes(BUYER_INACTIVE)) return 'inactive'
      if (this.roles.includes(BUYER)) return 'active'
      return null
    }
  }
}
</script>

<style lang="scss" scoped>
.billing {
  display: grid;
  grid-auto-flow: row;
  grid-gap: var(--spacing-5);
}
</style>
