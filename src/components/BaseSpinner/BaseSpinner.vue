<template>
  <div class="base-spinner"/>
</template>

<style lang="scss" scoped>
.base-spinner {
  width: 20px;
  height: 20px;
  border-style: solid;
  border-width: 2px;
  border-radius: 50%;
  border-color: rgb(76, 76, 76) rgb(76, 76, 76) rgb(211, 211, 211) rgb(211, 211, 211);
  animation: spin 0.8s linear 0s infinite normal none running;
}
@keyframes spin {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}
</style>
