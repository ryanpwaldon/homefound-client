<template>
  <div class="base-modal-container" @click="$store.commit('ui/setActiveModalType', null)">
    <div class="backdrop"/>
    <BaseCard class="card" @click.native.stop>
      <slot/>
    </BaseCard>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard/BaseCard'
export default {
  components: {
    BaseCard
  },
  created () {
    document.querySelector('body').style.overflow = 'hidden'
  },
  beforeDestroy () {
    document.querySelector('body').style.overflow = 'auto'
  }
}
</script>

<style lang="scss" scoped>
.base-modal-container {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: auto;
  z-index: 1;
}
.backdrop {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: var(--color-black-2);
  opacity: 0.5;
  z-index: -1;
}
.card {
  width: 500px;
}
</style>
