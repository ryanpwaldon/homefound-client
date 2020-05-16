<template>
  <BaseCard>
    <BaseMarkdown :markdown="markdown"/>
  </BaseCard>
</template>

<script>
import BaseMarkdown from '@/components/BaseMarkdown/BaseMarkdown'
import BaseCard from '@/components/BaseCard/BaseCard'
import markdown from './assets/FAQs.md'
export default {
  name: 'faqs-buyer',
  components: {
    BaseMarkdown,
    BaseCard
  },
  created () {
    this.markdown = markdown
  }
}
</script>
