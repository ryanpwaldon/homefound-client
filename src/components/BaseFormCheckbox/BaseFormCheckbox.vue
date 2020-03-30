<template>
  <div class="base-form-checkbox" v-on="disabled ? {} : { click: toggle }">
    <div class="tick" :style="{opacity: value ? 1 : 0}"/>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggle () {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-form-checkbox {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  border: solid 1px var(--color-gray-3);
  border-radius: var(--border-radius-1);
  font-size: 1.4rem;
  height: 1em;
  width: 1em;
  cursor: pointer;
  overflow: hidden;
}
.tick {
  transition: opacity 0.05s ease-out;
  background-image: url('../../assets/img/tick-2.svg');
  background-color: var(--color-white-1);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 70% auto;
  height: 100%;
  width: 100%;
}
</style>
