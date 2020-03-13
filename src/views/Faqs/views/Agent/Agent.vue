<template>
  <BaseCard>
    <div class="faq">
      <div class="question">Can I list a property on Homefound if it is already listed for sale on REA or Domain?</div>
      <div class="answer">No.</div>
    </div>
    <div class="faq">
      <div class="question">Amet lorem ipsum dolor sit?</div>
      <div class="answer">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.</div>
    </div>
    <div class="faq">
      <div class="question">Amet lorem ipsum dolor sit?</div>
      <div class="answer">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.</div>
    </div>
    <div class="faq">
      <div class="question">Amet lorem ipsum dolor sit?</div>
      <div class="answer">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.</div>
    </div>
    <div class="faq">
      <div class="question">Amet lorem ipsum dolor sit?</div>
      <div class="answer">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.</div>
    </div>
    <div class="faq">
      <div class="question">Amet lorem ipsum dolor sit?</div>
      <div class="answer">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.</div>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseCard/BaseCard'
export default {
  name: 'faqs-agent',
  components: {
    BaseCard
  }
}
</script>

<style lang="scss" scoped>
.faq {
  font-size: 1.6rem;
}
.faq:not(:last-child) {
  margin-bottom: var(--spacing-5);
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
