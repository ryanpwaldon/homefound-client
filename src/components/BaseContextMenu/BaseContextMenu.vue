<template>
  <div class="trigger-container" @click.prevent="open">
    <slot name="trigger"/>
    <Portal v-if="portalState">
      <div class="context-menu-container" :style="style" @click="close">
        <BaseTransitionContextMenu @after-leave="portalState = false">
          <div class="context-menu" ref="context-menu" v-if="contextMenuState" @click.stop v-contain-scroll>
            <slot name="content" :close="close"/>
          </div>
        </BaseTransitionContextMenu>
      </div>
    </Portal>
  </div>
</template>

<script>
import { Portal } from '@linusborg/vue-simple-portal'
import BaseTransitionContextMenu from '@/components/BaseTransitionContextMenu/BaseTransitionContextMenu'
export default {
  components: {
    Portal,
    BaseTransitionContextMenu
  },
  data: () => ({
    portalState: false,
    contextMenuState: false,
    padding: 20,
    style: null
  }),
  methods: {
    async open () {
      this.portalState = true
      await this.$nextTick()
      this.contextMenuState = true
      await this.$nextTick()
      await this.$nextTick()
      const { top, left } = this.$el.getBoundingClientRect()
      this.style = {
        padding: `${this.padding}px`,
        gridTemplateRows: `minmax(0, ${top - this.padding + (this.$el.offsetHeight - this.$refs['context-menu'].offsetHeight) / 2}px) minmax(min-content, 1fr)`,
        gridTemplateColumns: `minmax(0, ${left + this.$el.offsetWidth}px) minmax(min-content, 1fr)`
      }
    },
    close () {
      this.contextMenuState = false
    }
  }
}
</script>

<style lang="scss" scoped>
.trigger-container {
  position: relative;
}
.context-menu-container {
  position: fixed;
  display: grid;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  cursor: auto;
}
.context-menu {
  align-self: flex-start;
  grid-column: 2;
  grid-row: 2;
  width: 21rem;
  background: var(--color-white-1);
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-3);
  font-size: 1.4rem;
  max-height: 38rem;
  overflow: auto;
}
</style>
