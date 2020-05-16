<template>
  <BaseCard class="agent">
    <div class="top">
      <div class="dollar">$</div>
      <div class="price">0</div>
      <div class="period">free<br>forever</div>
    </div>
    <div class="divider"/>
    <div class="middle">
      <div class="feature bold">What's included?</div>
      <div class="feature">List unlimited properties</div>
      <div class="feature">Real-time engagement tracking</div>
      <div class="feature">Daily performance emails</div>
    </div>
    <div class="divider"/>
    <div class="bottom">
      <router-link to="/signup/agent">
        <BaseButtonLarge class="button" text="Get started" design="red"/>
      </router-link>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseButtonLarge from '@/components/BaseButtonLarge/BaseButtonLarge'
export default {
  components: {
    BaseCard,
    BaseButtonLarge
  }
}
</script>

<style lang="scss" scoped>
.agent {
  width: 38rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  @include media(sm-only) {
    width: 100%;
  }
}
.top {
  display: flex;
  justify-content: center;
  align-items: center;
}
.dollar {
  font-size: 1.6rem;
  font-family: var(--font-2);
  margin-right: var(--spacing-2);
}
.price {
  font-size: 8rem;
  font-family: var(--font-2);
  margin-right: var(--spacing-3);
}
.period {
  font-size: 1.6rem;
  text-align: left;
}
.divider {
  position: relative;
  width: calc(100% + 6rem);
  left: -3rem;
  height: 1px;
  background: var(--color-gray-1);
  margin: var(--spacing-5) 0;
}
.middle {
  display: flex;
  flex-direction: column;
  align-items: center;
  > *:not(:last-child) {
    margin-bottom: var(--spacing-5);
  }
}
.feature {
  font-size: 1.6rem;
}
.button {
  width: 100%;
}
.bold {
  font-weight: var(--font-weight-medium);
}
</style>
