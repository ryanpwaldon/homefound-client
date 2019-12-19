<template>
  <div class="base-form-error">
    <div class="tooltip" v-if="message">
      <img class="icon" src="@/assets/img/question.svg">
      <div class="message">
        {{ message }}
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
  &:hover {
    z-index: 2;
    .message {
      opacity: 1;
    }
  }
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
}
.icon {
  height: 50%;
}
.message {
  top: 50%;
  z-index: 1;
  transform: translateY(-50%);
  left: calc(100% + var(--spacing-2));
  position: absolute;
  pointer-events: none;
  border-radius: var(--border-radius-1);
  background: var(--color-white-1);
  opacity: 0;
  transition: opacity 0.2s ease;
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: var(--spacing-2);
  font-size: 1.4rem;
  box-shadow: var(--box-shadow-1);
}
</style>
