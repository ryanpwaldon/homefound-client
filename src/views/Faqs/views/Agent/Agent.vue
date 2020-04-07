<template>
  <BaseCard>
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
