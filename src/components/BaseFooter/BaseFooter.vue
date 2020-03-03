<template>
  <div class="base-footer">
    <div class="content">
      <div class="col col-1">
        <router-link class="logo-container" to="/">
          <img class="logo" src="@/assets/img/logo-7.svg">
          <div class="logo-title">Homefound</div>
        </router-link>
        <div class="logo-subcopy">Discover properties before the crowd.</div>
        <div class="logo-subcopy">© {{ (new Date()).getFullYear() }} Homefound.</div>
      </div>
      <div class="col col-2">
        <div class="heading">Info</div>
        <BaseDivider class="divider"/>
        <BaseNavItemText text="Buyers" path="/" active-mode="none"/>
        <BaseNavItemText text="Agents" path="/agents" active-mode="none"/>
        <BaseNavItemText text="Pricing" path="/pricing" active-mode="none"/>
        <BaseNavItemText text="FAQs" path="/faqs" active-mode="none"/>
      </div>
      <div class="col col-3">
        <div class="heading">Actions</div>
        <BaseDivider class="divider"/>
        <BaseNavItemText text="Login" path="/login" active-mode="none"/>
        <BaseNavItemText text="Sign up" path="/signup" active-mode="none"/>
      </div>
      <div class="col col-4">
        <div class="heading">Legal</div>
        <BaseDivider class="divider"/>
        <BaseNavItemText text="Terms" path="/terms" active-mode="none"/>
        <BaseNavItemText text="Privacy" path="/privacy" active-mode="none"/>
      </div>
      <div class="col col-5">
        <div class="heading">Help</div>
        <BaseDivider class="divider"/>
        <BaseNavItemText text="Email us"/>
        <BaseNavItemText text="Send us a message"/>
      </div>
    </div>
  </div>
</template>

<script>
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseNavItemText from '@/components/BaseNavItemText/BaseNavItemText'
export default {
  components: {
    BaseDivider,
    BaseNavItemText
  }
}
</script>

<style lang="scss" scoped>
.base-footer {
  width: 100%;
  padding: 0 var(--spacing-5);
  background: var(--color-gray-2);
  border-top: var(--color-gray-1) solid 1px;
  display: flex;
  justify-content: center;
}
.content {
  width: 100%;
  max-width: 90rem;
  padding: var(--spacing-10) 0;
  display: grid;
  grid-auto-flow: column;
  align-items: flex-start;
  justify-content: space-between;
  @include media(sm-only) {
    padding: var(--spacing-8) 0;
    grid-gap: var(--spacing-8);
    grid-auto-flow: row;
    justify-content: normal;
    > * {
      width: 100%;
    }
  }
}
.heading {
  font-size: 1.4rem;
  font-weight: var(--font-weight-medium);
}
.col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > *:not(:last-child) {
    margin-bottom: var(--spacing-4);
  }
  @include media(sm-only) {
    > * {
      width: 100%;
    }
  }
}
.col-1 {
  > *:not(:last-child) {
    margin-bottom: var(--spacing-2);
  }
  .logo-container {
    display: flex;
    align-items: center;
  }
  .logo {
    height: 25px;
    margin-right: var(--spacing-2);
  }
  .logo-title {
    font-weight: var(--font-weight-medium);
    font-size: 1.4rem;
  }
  .logo-subcopy {
    font-size: 1.2rem;
    color: var(--color-gray-4);
  }
  @include media(sm-only) {
    grid-row: 5;
  }
}
.divider {
  display: none;
  @include media(sm-only) {
    display: block;
    margin: 0 0 var(--spacing-4) 0 !important;
  }
}
</style>
