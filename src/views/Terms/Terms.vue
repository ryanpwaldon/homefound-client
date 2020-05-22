<template>
  <BaseLayoutHome>
    <div class="container">
      <BaseMarkdown :markdown="markdown"/>
    </div>
  </BaseLayoutHome>
</template>

<script>
import BaseLayoutHome from '@/components/BaseLayoutHome/BaseLayoutHome'
import BaseMarkdown from '@/components/BaseMarkdown/BaseMarkdown'
import markdown from './assets/terms-and-conditions.md'
export default {
  metaInfo: {
    title: 'Terms of Service'
  },
  components: {
    BaseLayoutHome,
    BaseMarkdown
  },
  created () {
    this.markdown = markdown
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 10rem auto;
  max-width: 70rem;
  @include media(sm-only) {
    margin: 6rem 0;
  }
}
</style>
