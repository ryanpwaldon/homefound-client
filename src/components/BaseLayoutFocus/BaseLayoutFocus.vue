<template>
  <div class="base-layout-focus">
    <router-link class="logo" to="/">
      <img src="@/assets/img/logo-7.svg">
    </router-link>
    <BaseCard class="content">
      <slot/>
    </BaseCard>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard/BaseCard'
export default {
  components: {
    BaseCard
  }
}
</script>

<style lang="scss" scoped>
.base-layout-focus {
  width: 100%;
  min-height: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: var(--color-gray-2);
}
.logo {
  position: absolute;
  display: block;
  margin: var(--spacing-4);
  height: 2.5rem;
  left: 0;
  top: 0;
  img {
    display: block;
    height: 100%;
  }
}
.content {
  width: 400px;
}
</style>
