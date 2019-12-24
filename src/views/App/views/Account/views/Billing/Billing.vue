<template>
  <div class="billing">
    <AccountCardSubscription/>
    <template v-if="subscribed">
      <AccountCardNextInvoice/>
      <AccountCardPaymentMethod/>
    </template>
  </div>
</template>

<script>
import AccountCardSubscription from './partials/AccountCardSubscription/AccountCardSubscription'
import AccountCardNextInvoice from './partials/AccountCardNextInvoice/AccountCardNextInvoice'
import AccountCardPaymentMethod from './partials/AccountCardPaymentMethod/AccountCardPaymentMethod'
import { mapState } from 'vuex'
export default {
  name: 'billing',
  components: {
    AccountCardSubscription,
    AccountCardNextInvoice,
    AccountCardPaymentMethod
  },
  computed: mapState('user', {
    subscribed: state => state.user.roles.includes('buyer')
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
