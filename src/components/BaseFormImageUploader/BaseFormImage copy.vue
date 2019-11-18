<template>
  <div class="base-form-image">
    <label for="file">Upload photo <img src="@/assets/img/plus-light.svg"></label>
    <div class="image"/>
    <input class="input" id="file" type="file" @input="$emit('input', $event.target.value)" :value="value">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.base-form-image {
  position: relative;
  cursor: pointer;
}
.base-form-image label {
  width: 130px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  color: var(--color-gray-4);
  border: solid 1px var(--color-gray-3);
  border-radius: var(--border-radius-1);
  cursor: pointer;
  img {
    height: 0.9rem;
    margin-left: var(--spacing-1);
  }
}
input {
  display: none;
}
</style>
