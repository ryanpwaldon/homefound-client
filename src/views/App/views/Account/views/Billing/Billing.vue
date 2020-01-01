<template>
  <div class="billing">
    <AccountCardCancelSubscription v-if="subscribed"/>
    <AccountCardActivateSubscription v-if="!subscribed"/>
    <AccountCardReactivateSubscription v-if="pendingCancellation && subscribed"/>
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
import { BUYER, BUYER_PENDING_CANCELLATION } from '@/roles/roles'
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
  computed: mapState('user', {
    subscribed: state => state.user.roles.includes(BUYER),
    pendingCancellation: state => state.user.roles.includes(BUYER_PENDING_CANCELLATION),
    hasCardDetails: state => state.user.cardBrand && state.user.cardLast4,
    nextInvoiceAt: state => state.user.nextInvoiceAt
  })
}
</script>

<style lang="scss" scoped>
.billing {
  display: grid;
  grid-auto-flow: row;
  grid-gap: var(--spacing-5);
}
</style>
