<template>
  <div class="cta">
    <div class="title">Start searching smarter</div>
    <div class="subtitle">Join and access an exclusive feed of off-market properties</div>
    <div class="buttons">
      <router-link to="/signup/buyer">
        <BaseButtonLarge text="Get started" design="red"/>
      </router-link>
      <BaseButtonLarge text="Have a question?" design="pink"/>
    </div>
  </div>
</template>

<script>
import BaseButtonLarge from '@/components/BaseButtonLarge/BaseButtonLarge'
export default {
  components: {
    BaseButtonLarge
  }
}
</script>

<style lang="scss" scoped>
.cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.title {
  font-size: 3.5rem;
  font-weight: var(--font-weight-bold);
  margin-bottom: 1rem;
  @include media(sm-only) {
    font-size: 3rem;
    line-height: 1.3;
  }
}
.subtitle {
  font-size: 1.5rem;
  margin-bottom: 3rem;
  line-height: 1.5;
  color: var(--color-gray-4);
  width: 100%;
  @include media(sm-only) {
    width: 100%;
    margin-bottom: var(--spacing-4) !important;
  }
}
.buttons {
  display: flex;
  > *:first-child {
    margin-right: var(--spacing-4);
  }
  @include media(sm-only) {
    display: flex;
    flex-direction: column;
    margin-bottom: var(--spacing-4) !important;
    width: 100%;
    * {
      width: 100%;
    }
    > *:first-child {
      margin-right: 0;
      margin-bottom: var(--spacing-2);
    }
  }
}
</style>
