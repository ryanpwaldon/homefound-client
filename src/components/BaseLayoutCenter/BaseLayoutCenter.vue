<template>
  <div class="base-layout-center">
    <div class="container">
      <div class="content">
        <slot/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-layout-center {
  width: 100%;
  height: 100%;
  display: flex;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--color-gray-2);
  padding: 0 var(--spacing-5);
  overflow: auto;
}
.content {
  flex: 1;
  width: 100%;
  max-width: 600px;
  padding: var(--spacing-6) 0;
  display: flex;
  flex-direction: column;
}
</style>
