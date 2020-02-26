<template>
  <BaseCard class="agent">
    <div class="top">
      <div class="price">Free forever</div>
    </div>
    <div class="divider"/>
    <div class="middle">
      <div class="feature">Full access to our listings</div>
      <div class="feature">Real-time analytics</div>
      <div class="feature">Tempor incididunt ut labore et</div>
      <div class="feature">Ut enim ad minim veniam</div>
      <div class="feature">Adipisicing elit sed do eiusmod</div>
      <div class="feature">Mollit anim id est laborum</div>
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
}
.top {
  display: flex;
  justify-content: center;
  align-items: center;
}
.price {
  font-size: 3.5rem;
  font-family: Rubik;
  font-weight: var(--font-weight-regular);
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
    margin-bottom: var(--spacing-4);
  }
}
.feature {
  font-size: 1.6rem;
}
.button {
  width: 100%;
}
</style>
