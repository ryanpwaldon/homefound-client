<template>
  <div class="base-layout-home">
    <BaseNavHorizontalPrimary/>
    <div class="layout-container">
      <div class="layout-content">
        <slot/>
      </div>
    </div>
    <BaseFooter/>
  </div>
</template>

<script>
import BaseNavHorizontalPrimary from '@/components/BaseNavHorizontalPrimary/BaseNavHorizontalPrimary'
import BaseFooter from '@/components/BaseFooter/BaseFooter'
export default {
  components: {
    BaseNavHorizontalPrimary,
    BaseFooter
  }
}
</script>

<style lang="scss" scoped>
.base-layout-home {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.layout-container {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 0 var(--spacing-5);
  background: var(--color-gray-2);
  align-items: center;
  @include media(sm-only) {
    padding: 0 var(--spacing-4);
  }
}
.layout-content {
  width: 100%;
  max-width: 90rem;
}
</style>
