<template>
  <BaseLayoutHome>
    <div class="container">
      <div class="title">Pricing</div>
      <div class="nav">
        <BaseNavItemText text="Buyer" path="/pricing/buyer"/>
        <BaseNavItemText text="Agent" path="/pricing/agent"/>
      </div>
      <router-view class="router-view"/>
    </div>
  </BaseLayoutHome>
</template>

<script>
import BaseLayoutHome from '@/components/BaseLayoutHome/BaseLayoutHome'
import BaseNavItemText from '@/components/BaseNavItemText/BaseNavItemText'
export default {
  name: 'pricing',
  components: {
    BaseLayoutHome,
    BaseNavItemText
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: grid;
  padding: var(--spacing-10) 0;
  grid-template-columns: 1fr 2fr;
  grid-gap: var(--spacing-5);
  align-items: flex-start;
  @include media(sm-only) {
    grid-template-columns: auto;
    padding: var(--spacing-8) 0;
  }
}
.title {
  font-size: 2rem;
  font-weight: var(--font-weight-medium);
}
.nav {
  grid-row: 2;
  grid-column: 1;
  font-weight: var(--font-weight-medium);
  @include media(md-up) {
    background: var(--color-white-1);
    border-radius: var(--border-radius-1);
    box-shadow: var(--box-shadow-1);
    padding: var(--spacing-5);
  }
  @include media(sm-only) {
    grid-row: 1;
    grid-column: 2;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  > *:not(:last-child) {
    margin-bottom: var(--spacing-3);
    @include media(sm-only) {
      margin-bottom: 0;
      margin-right: 3rem;
    }
  }
}
.router-view {
  grid-row: 2;
  grid-column: 2;
  margin: auto;
  @include media(sm-only) {
    grid-row: 2;
    grid-column: 1 / span 2;
  }
}
</style>
