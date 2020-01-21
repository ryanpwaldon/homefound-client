<template>
  <input
    class="base-form-input"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    @input="$emit('input', $event.target.value)"
    :value="value"
    :type="type"
  >
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    type: {
      type: String,
      default: 'text'
    },
    autocomplete: {
      type: String,
      default: 'disabled'
    }
  }
}
</script>

<style lang="scss" scoped>
.base-form-input {
  color: var(--color-black-2);
  background: var(--color-white-1);
  padding: var(--spacing-2);
  border: solid 1px var(--color-gray-3);
  border-radius: var(--border-radius-1);
  font-size: 1.4rem;
  width: 100%;
  &:focus {
    border-color: var(--color-black-2);
  }
}
</style>
