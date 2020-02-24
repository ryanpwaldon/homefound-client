<template>
  <BaseLayoutCenter>
    <div class="account">
      <BaseText1 class="title" text="Account"/>
      <BaseNavHorizontalSecondary class="nav" :nav-items="navItems"/>
      <router-view/>
    </div>
  </BaseLayoutCenter>
</template>

<script>
import BaseLayoutCenter from '@/components/BaseLayoutCenter/BaseLayoutCenter'
import BaseNavHorizontalSecondary from '@/components/BaseNavHorizontalSecondary/BaseNavHorizontalSecondary'
import BaseText1 from '@/components/BaseText1/BaseText1'
export default {
  name: 'account',
  components: {
    BaseLayoutCenter,
    BaseNavHorizontalSecondary,
    BaseText1
  },
  data: () => ({
    navItems: [
      { text: 'Overview', path: `/app/account/overview` },
      { text: 'Billing', path: `/app/account/billing` }
    ]
  })
}
</script>

<style lang="scss" scoped>
.title, .nav {
  margin-bottom: var(--spacing-5);
}
</style>
