<template>
  <div class="overview">
    <AccountCardUser/>
    <AccountCardEmail/>
    <AccountCardPassword/>
  </div>
</template>

<script>
import AccountCardUser from './partials/AccountCardUser/AccountCardUser'
import AccountCardEmail from './partials/AccountCardEmail/AccountCardEmail'
import AccountCardPassword from './partials/AccountCardPassword/AccountCardPassword'
export default {
  name: 'overview',
  components: {
    AccountCardUser,
    AccountCardEmail,
    AccountCardPassword
  }
}
</script>

<style lang="scss" scoped>
.overview {
  display: grid;
  grid-auto-flow: row;
  grid-gap: var(--spacing-5);
}
</style>
