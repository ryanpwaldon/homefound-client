<template>
  <BaseLayoutHome>
  <div class="container">
    <div class="title">FAQs</div>
    <div class="content">
      <BaseCard class="nav">
        <BaseNavItemText text="Buyer" path="/faqs/buyer"/>
        <BaseNavItemText text="Agent" path="/faqs/agent"/>
      </BaseCard>
      <router-view/>
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
  grid-template-columns: 1fr 2fr;
  grid-gap: var(--spacing-5);
  align-items: flex-start;
  @include media(sm-only) {
    grid-template-columns: auto;
  }
}
.nav {
  font-weight: var(--font-weight-medium);
  > *:not(:last-child) {
    margin-bottom: var(--spacing-3);
  }
}
</style>
