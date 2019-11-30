<template>
  <div class="base-form-select" :class="{focus: isOpen}" v-on="isOpen ? {} : { click: open }">
    <div class="selected" :style="{color: value ? 'var(--color-black-1)' : 'var(--color-gray-4)'}">
      {{ selected && selected.title || placeholder }}
    </div>
    <img class="icon" src="@/assets/img/arrow-down.svg">
    <div class="dropdown" v-if="isOpen">
      <div class="placeholder" @click="$emit('input', undefined)">{{ placeholder }}</div>
      <div
        class="option"
        v-for="(option, i) in options"
        @click="$emit('input', option.value)"
        :key="i">
        {{ option.title }}
      </div>
    </div>
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
    isOpen: false
  }),
  computed: {
    selected () {
      return this.options.find(option => option.value === this.value)
    }
  },
  methods: {
    open (e) {
      this.isOpen = true
      e.stopImmediatePropagation()
      document.addEventListener('click', this.close)
    },
    close () {
      this.isOpen = false
      document.removeEventListener('click', this.close)
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
  &.focus { border-color: var(--color-black) }
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
  z-index: 1;
}
.placeholder,
.option {
  padding: var(--spacing-2);
  &:hover { background: var(--color-gray-1) }
}
.placeholder {
  color: var(--color-gray-4);
}
</style>
