<template>
  <div class="overview">
    <AccountCardUser/>
    <AccountCardEmail/>
  </div>
</template>

<script>
import AccountCardUser from './partials/AccountCardUser/AccountCardUser'
import AccountCardEmail from './partials/AccountCardEmail/AccountCardEmail'
export default {
  name: 'overview',
  components: {
    AccountCardUser,
    AccountCardEmail
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
