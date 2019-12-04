<template>
  <LayoutCenter>
    <div class="account">
      <BaseText1 class="title" text="Account"/>
      <BaseNavHorizontal class="nav" :nav-items="navItems"/>
      <router-view/>
    </div>
  </LayoutCenter>
</template>

<script>
import LayoutCenter from '@/layouts/LayoutCenter/LayoutCenter'
import BaseNavHorizontal from '@/components/BaseNavHorizontal/BaseNavHorizontal'
import BaseText1 from '@/components/BaseText1/BaseText1'
export default {
  name: 'account',
  components: {
    LayoutCenter,
    BaseNavHorizontal,
    BaseText1
  },
  data: () => ({
    navItems: [
      { title: 'Overview', path: `/app/account/overview` },
      { title: 'Billing', path: `/app/account/billing` }
    ]
  })
}
</script>

<style lang="scss" scoped>
.title, .nav {
  margin-bottom: var(--spacing-5);
}
</style>
