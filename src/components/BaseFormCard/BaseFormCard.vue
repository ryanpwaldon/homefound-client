<template>
  <div class="base-form-card"/>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: false
    }
  },
  async mounted () {
    await this.$el
    this.initCard()
  },
  methods: {
    async initCard () {
      const elements = (await window.stripe).elements()
      const card = elements.create('card', { style: this.getCardStyle(), classes: { focus: 'focus' } })
      card.mount(this.$el)
      card.on('change', ({ complete, error, empty }) => {
        if (empty) return this.$emit('input', null)
        this.$emit('input', { item: card, valid: !!complete, error: error && error.message })
      })
    },
    getCardStyle () {
      const getStyle = property => getComputedStyle(document.body).getPropertyValue(property)
      return {
        base: {
          fontSmoothing: 'antialiased',
          fontSize: getStyle('1.4rem'),
          color: getStyle('--color-black-2'),
          fontFamily: getStyle('--font-1'),
          '::placeholder': {
            color: getStyle('--color-gray-4')
          }
        },
        invalid: {
          color: getStyle('--color-red-1'),
          iconColor: getStyle('--color-red-1')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-form-card {
  padding: var(--spacing-2);
  border-radius: var(--border-radius-1);
  border: solid 1px var(--color-gray-1);
  background: var(--color-gray-2);
  transition: border-color 0.2s;
  cursor: text;
  &:hover,
  &.focus {
    border-color: var(--color-black-2);
  }
}
</style>
