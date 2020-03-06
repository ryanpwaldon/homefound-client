<template>
  <BaseCard class="buyer">
    <div class="toggle-container">
      <div :class="{label: true, active: !isYearly}">Monthly</div>
      <BaseFormToggle
        class="toggle"
        v-model="isYearly"
        bg-active-color="--color-gray-8"
        bg-inactive-color="--color-gray-8"
        knob-active-color="--color-black-2"
        knob-inactive-color="--color-black-2"
        design="large"
      />
      <div :class="{label: true, active: isYearly}">Yearly (save 20%)</div>
    </div>
    <div class="top">
      <div class="dollar">$</div>
      <div class="price">{{ price }}</div>
      <div class="period">billed<br>{{ period }}</div>
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
      <router-link to="/signup/buyer">
        <BaseButtonLarge class="button" text="Get started" design="red"/>
      </router-link>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseButtonLarge from '@/components/BaseButtonLarge/BaseButtonLarge'
import BaseFormToggle from '@/components/BaseFormToggle/BaseFormToggle'
export default {
  components: {
    BaseCard,
    BaseButtonLarge,
    BaseFormToggle
  },
  data: () => ({
    isYearly: false
  }),
  computed: {
    price () {
      return this.isYearly ? '710' : '74'
    },
    period () {
      return this.isYearly ? 'yearly' : 'monthly'
    }
  }
}
</script>

<style lang="scss" scoped>
.buyer {
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
    margin-bottom: var(--spacing-4);
  }
}
.feature {
  font-size: 1.6rem;
}
.button {
  width: 100%;
}
.toggle-container {
  position: absolute;
  width: 100%;
  bottom: 100%;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-5);
  color: var(--color-gray-4);
  > *:not(:last-child) {
    margin-right: var(--spacing-2);
  }
  .active {
    color: var(--color-black-2);
  }
  .label {
    font-weight: var(--font-weight-medium);
    transition: color var(--transition-settings-1);
  }
  @include media(sm-only) {
    position: static;
  }
}
</style>
