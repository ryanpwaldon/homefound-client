<template>
  <div class="header">
    <div class="content">
      <div class="title">Off market property for buyers agents</div>
      <div class="subtitle">Subscribe and gain access to an exclusive feed of pre-market and off-market properties</div>
      <div class="buttons">
        <router-link to="/signup/buyer">
          <BaseButtonLarge text="Get started" design="red"/>
        </router-link>
        <BaseButtonLarge
          text="Explore listings"
          design="pink"
          @click.native="$emit('secondary-button-clicked')"
        />
      </div>
    </div>
    <img class="illustration large" src="../../assets/buyer-header-illustration-large.svg">
    <img class="illustration small" src="../../assets/buyer-header-illustration-small.svg">
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @include media(sm-only) {
    flex-direction: column-reverse;
  }
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: var(--spacing-3);
  max-width: 44rem;
  height: 100%;
  z-index: 1;
  align-items: flex-start;
  @include media(sm-only) {
    text-align: center;
    align-items: center;
    margin-right: 0;
    max-width: none;
  }
}
.title {
  font-size: 4.5rem;
  font-weight: var(--font-weight-bold);
  margin-bottom: 2.5rem;
  @include media(sm-only) {
    font-size: 3rem;
    line-height: 1.3;
    margin-bottom: var(--spacing-3);
  }
}
.subtitle {
  width: 100%;
  font-size: 2rem;
  line-height: 1.5;
  color: var(--color-gray-4);
  margin-bottom: var(--spacing-5);
  @include media(sm-only) {
    width: 100%;
    margin-bottom: var(--spacing-4);
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
.illustration.large {
  flex-grow: 1;
  display: block;
  min-width: 36rem;
  @include media(sm-only) {
    display: none;
  }
}
.illustration.small {
  width: 70%;
  max-width: 36rem;
  margin-bottom: var(--spacing-5);
  display: none;
  @include media(sm-only) {
    display: block;
  }
}
</style>
