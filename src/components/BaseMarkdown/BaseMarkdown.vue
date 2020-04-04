<template>
  <div class="base-markdown" v-html="compiledMarkdown"/>
</template>

<script>
import marked from 'marked'
export default {
  props: {
    markdown: {
      type: String,
      required: true
    }
  },
  computed: {
    compiledMarkdown () {
      return marked(this.markdown)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-markdown ::v-deep {
  * {
    line-height: 1.5;
  }
  h1 {
    font-size: 4.5rem;
    font-weight: var(--font-weight-bold);
  }
  a {
    text-decoration: underline;
  }
  strong {
    font-weight: var(--font-weight-semibold);
  }
}
</style>
