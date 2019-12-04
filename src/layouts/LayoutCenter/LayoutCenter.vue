<template>
  <div class="layout-center">
    <div class="container">
      <div class="content">
        <slot/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-center {
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
  width: 100%;
  max-width: 600px;
  margin: var(--spacing-6) 0;
}
</style>
