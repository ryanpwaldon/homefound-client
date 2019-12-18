<template>
  <div class="billing">
    <AccountCardSubscription/>
    <AccountCardNextInvoice/>
    <AccountCardPaymentMethod/>
  </div>
</template>

<script>
import AccountCardSubscription from './partials/AccountCardSubscription/AccountCardSubscription'
import AccountCardNextInvoice from './partials/AccountCardNextInvoice/AccountCardNextInvoice'
import AccountCardPaymentMethod from './partials/AccountCardPaymentMethod/AccountCardPaymentMethod'
export default {
  name: 'billing',
  components: {
    AccountCardSubscription,
    AccountCardNextInvoice,
    AccountCardPaymentMethod
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
