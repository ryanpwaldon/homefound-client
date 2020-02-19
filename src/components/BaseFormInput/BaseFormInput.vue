<template>
  <input
    class="base-form-input"
    :class="{ disabled }"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    @input="$emit('input', $event.target.value)"
    :value="value"
    :type="type"
    :disabled="disabled"
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
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.base-form-input {
  color: var(--color-black-2);
  background: var(--color-gray-2);
  padding: var(--spacing-2);
  border: solid 1px var(--color-gray-1);
  border-radius: var(--border-radius-1);
  font-size: 1.4rem;
  width: 100%;
  transition: var(--transition-settings-1) border-color;
  &:focus,
  &:hover {
    border-color: var(--color-black-2);
  }
  &.disabled {
    pointer-events: none;
    background: var(--color-gray-1);
  }
}
</style>
