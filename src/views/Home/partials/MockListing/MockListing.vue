<template>
  <div class="mock-listing">
    <div class="image-container">
      <div class="image" :style="{backgroundImage: `url(${image})`}"/>
    </div>
    <div class="row">
      <div class="placeholder placeholder-1"/>
      <div class="placeholder placeholder-2"/>
    </div>
    <div class="row">
      <div class="placeholder placeholder-3"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.mock-listing {
  display: flex;
  flex-direction: column;
  width: 18rem;
  padding: var(--spacing-2);
  position: relative;
  box-shadow: var(--box-shadow-1);
  border-radius: var(--border-radius-1);
  background: var(--color-white-1);
  > *:not(:last-child) {
    margin-bottom: var(--spacing-2);
  }
}
.image-container {
  width: 100%;
  position: relative;
  padding-top: 105%;
  height: 0;
}
.image {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: var(--border-radius-1);
}
.row {
  display: flex;
  justify-content: space-between;
  height: var(--spacing-3);
  width: 100%;
}
.placeholder {
  height: 100%;
  border-radius: 100px;
  background: var(--color-gray-5);
  & :first-child { margin-right: auto }
}
.placeholder-1 {
  width: 6rem;
}
.placeholder-2 {
  width: 4rem;
}
.placeholder-3 {
  width: 10rem;
}
</style>
