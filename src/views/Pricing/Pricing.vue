<template>
  <BaseLayoutHome>
  <div class="container">
    <div class="title">Pricing</div>
    <div class="content">
      <BaseCard class="nav">
        <BaseNavItemText class="nav-item" text="Buyer" path="/pricing/buyer"/>
        <BaseNavItemText class="nav-item" text="Agent" path="/pricing/agent"/>
      </BaseCard>
      <div class="view-container">
        <router-view/>
      </div>
    </div>
  </div>
  </BaseLayoutHome>
</template>

<script>
import BaseLayoutHome from '@/components/BaseLayoutHome/BaseLayoutHome'
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseNavItemText from '@/components/BaseNavItemText/BaseNavItemText'
export default {
  name: 'pricing',
  components: {
    BaseLayoutHome,
    BaseCard,
    BaseNavItemText
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: auto;
  padding: var(--spacing-10) 0;
  @include media(sm-only) {
    padding: var(--spacing-8) 0;
  }
}
.title {
  font-size: 2rem;
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-5);
}
.content {
  width: 100%;
  display: grid;
  grid-gap: var(--spacing-5);
  grid-template-columns: 1fr 2fr;
  align-items: flex-start;
  @include media(sm-only) {
    grid-template-columns: auto;
  }
}
.nav-item {
  font-weight: var(--font-weight-medium);
}
.nav-item:not(:last-child) {
  margin-bottom: var(--spacing-3);
}
.view-container {
  display: flex;
  justify-content: center;
}
</style>
