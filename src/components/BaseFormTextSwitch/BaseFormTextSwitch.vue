<template>
  <div class="base-form-text-switch" @click="$emit('input', Object.keys(options).find(key => key !== value))">{{ options[value] }}</div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.base-form-text-switch {
  font-size: 1rem;
  color: var(--color-gray-4);
  text-decoration: underline;
  cursor: pointer;
}
</style>
