<template>
  <div class="base-loader">
    <div class="spinner"/>
    <BaseText2 :text="text" v-if="text"/>
  </div>
</template>

<script>
import BaseText2 from '@/components/BaseText2/BaseText2'
export default {
  components: {
    BaseText2
  },
  props: {
    text: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.base-loader {
  display: flex;
  justify-content: center;
  align-items: center;
}
.base-loader > *:not(:last-child) {
  margin-right: var(--spacing-4)
}
.spinner {
  width: 20px;
  height: 20px;
  border-style: solid;
  border-width: 2px;
  border-radius: 50%;
  border-color: rgb(76, 76, 76) rgb(76, 76, 76) rgb(211, 211, 211) rgb(211, 211, 211);
  animation: spinner 0.8s linear 0s infinite normal none running;
}
@keyframes spinner {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}
</style>
