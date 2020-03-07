<template>
  <BaseLayoutHome>
    <div class="signup">
      <router-view/>
    </div>
  </BaseLayoutHome>
</template>

<script>
import BaseLayoutHome from '@/components/BaseLayoutHome/BaseLayoutHome'
export default {
  name: 'signup',
  components: {
    BaseLayoutHome
  }
}
</script>

<style lang="scss" scoped>
.signup {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-10) 0;
  @include media(sm-only) {
    padding: var(--spacing-8) 0;
  }
}
</style>
