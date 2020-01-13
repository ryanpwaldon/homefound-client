<template>
  <div class="base-form-select" :class="{focused}" @click="focused = !focused">
    <div class="selected" :style="{color: value ? 'var(--color-black-1)' : 'var(--color-gray-4)'}">
      {{ selected && selected.title || placeholder }}
    </div>
    <img class="icon" src="@/assets/img/arrow-down.svg">
    <template v-if="focused">
      <div class="dropdown">
        <div class="placeholder" @click="$emit('input', null)">{{ placeholder }}</div>
        <div
          class="option"
          v-for="(option, i) in options"
          @click="$emit('input', option.value)"
          :key="i">
          {{ option.title }}
        </div>
      </div>
      <div class="backdrop"/>
    </template>
  </div>
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
    options: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    focused: false
  }),
  computed: {
    selected () {
      return this.options.find(option => option.value === this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-form-select {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  border: solid 1px var(--color-gray-3);
  border-radius: var(--border-radius-1);
  padding: var(--spacing-2);
  white-space: nowrap;
  font-size: 1.4rem;
  cursor: pointer;
  &.focused { border-color: var(--color-black) }
}
.selected { margin-right: var(--spacing-2) }
.icon { height: 5px }
.dropdown {
  position: absolute;
  top: 100%;
  left: -1px;
  width: 200px;
  margin: var(--spacing-1) 0;
  background: var(--color-white-1);
  border: solid 1px var(--color-gray-3);
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-1);
  z-index: 2;
  max-height: 380px;
  overflow: auto;
}
.placeholder,
.option {
  padding: var(--spacing-2);
  &:hover { background: var(--color-gray-1) }
}
.placeholder {
  color: var(--color-gray-4);
}
.backdrop {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  cursor: auto;
}
</style>
