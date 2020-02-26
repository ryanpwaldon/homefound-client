<template>
  <BaseLayoutHome>
  <div class="container">
    <div class="title">FAQs</div>
    <div class="content">
      <BaseCard class="nav">
        <BaseNavItemText text="Buyer"/>
        <BaseNavItemText text="Agent"/>
      </BaseCard>
      <BaseCard>
        <div class="faq">
          <div class="question">Lorem ipsum dolor sit amet?</div>
          <div class="answer">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.</div>
        </div>
        <div class="faq">
          <div class="question">Lorem ipsum dolor sit amet?</div>
          <div class="answer">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.</div>
        </div>
        <div class="faq">
          <div class="question">Lorem ipsum dolor sit amet?</div>
          <div class="answer">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.</div>
        </div>
        <div class="faq">
          <div class="question">Lorem ipsum dolor sit amet?</div>
          <div class="answer">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.</div>
        </div>
        <div class="faq">
          <div class="question">Lorem ipsum dolor sit amet?</div>
          <div class="answer">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.</div>
        </div>
        <div class="faq">
          <div class="question">Lorem ipsum dolor sit amet?</div>
          <div class="answer">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.</div>
        </div>
      </BaseCard>
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
}
.nav {
  font-weight: var(--font-weight-medium);
  > *:not(:last-child) {
    margin-bottom: var(--spacing-3);
  }
}
.faq:not(:last-child) {
  margin-bottom: var(--spacing-5);
  font-size: 1.6rem;
}
.question {
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-2);
  line-height: 1.5;
}
.answer {
  color: var(--color-gray-4);
  line-height: 1.5;
}
</style>
