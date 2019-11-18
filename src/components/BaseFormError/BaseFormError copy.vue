<template>
  <div class="base-form-error">
    <div class="tooltip" v-if="message">
      <img class="icon" src="@/assets/img/question.svg">
      <div class="message-container">
        <div class="message">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.base-form-error {
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
  z-index: 1;
}
.tooltip {
  width: 1.6rem;
  height: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-red-1);
  border-radius: 100px;
  position: relative;
  &:hover .message-container {
    opacity: 1;
  }
}
.icon {
  height: 50%;
}
.message-container {
  top: 0;
  left: 0;
  height: 100%;
  position: absolute;
  padding-left: 1.6rem;
  pointer-events: none;
  border: solid 1px var(--color-red-1);
  border-radius: 100px;
  background: var(--color-white-1);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.2s ease;
}
.message {
  height: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-weight: var(--font-weight-medium);
  padding: 0 var(--spacing-1);
}
</style>
