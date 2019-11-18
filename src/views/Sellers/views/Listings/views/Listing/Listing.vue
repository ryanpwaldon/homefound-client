<template>
  <div class="listing">
    <BaseText1 class="title" text="New listing"/>
    <BaseNavHorizontal class="nav" :nav-items="navItems"/>
    <router-view/>
  </div>
</template>

<script>
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseNavHorizontal from '@/components/BaseNavHorizontal/BaseNavHorizontal'
export default {
  components: {
    BaseText1,
    BaseNavHorizontal
  },
  data: () => ({
    navItems: [
      { title: 'Create', path: '/sellers/listings/listing/create' },
      { title: 'Performance', path: '/sellers/listings/listing/performance' }
    ]
  })
}
</script>

<style lang="scss" scoped>
.title, .nav {
  margin-bottom: var(--spacing-5);
}
</style>
