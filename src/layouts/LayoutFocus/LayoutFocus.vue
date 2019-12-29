<template>
  <div class="layout-focus">
    <router-link to="/">
      <img class="logo" src="@/assets/img/logo-4.svg">
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

<style>
.layout-focus {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: var(--color-gray-2);
}
.logo {
  position: absolute;
  margin: var(--spacing-4);
  height: 2.5rem;
  left: 0;
  top: 0;
}
.content {
  width: 400px;
}
</style>
