<template>
  <div class="container" :class="{ open }" @click.prevent.stop>
    <div class="header">
      <router-link class="logo" to="/">
        <img src="@/assets/img/logo-7.svg">
        <BaseText2 text="Homefound"/>
      </router-link>
      <img class="menu" :src="require(`@/assets/img/${open ? 'close-thin' : 'menu'}.svg`)" @click="open = !open">
    </div>
    <div class="content" v-if="open">
      <BaseNavItemText
        v-for="(navItem, i) in navItems"
        :path="navItem.path"
        :text="navItem.text"
        :active-mode="navItem.activeMode"
        :design="navItem.design"
        :key="i"
      />
    </div>
  </div>
</template>

<script>
import BaseText2 from '@/components/BaseText2/BaseText2'
import BaseNavItemText from '@/components/BaseNavItemText/BaseNavItemText'
export default {
  components: {
    BaseText2,
    BaseNavItemText
  },
  props: {
    navItems: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    open: false
  })
}
</script>

<style lang="scss" scoped>
.container {
  position: sticky;
  width: 100%;
  top: 0;
  display: flex;
  flex-direction: column;
  font-weight: var(--font-weight-medium);
  z-index: 10;
}
.container.open {
  position: fixed;
  height: 100%;
}
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px var(--color-gray-1);
  background: var(--color-gray-2);
  padding: var(--spacing-4);
}
.logo {
  display: flex;
  align-items: center;
  > *:not(:last-child) {
    margin-right: var(--spacing-2);
  }
}
.logo img,
.menu {
  height: 25px;
  cursor: pointer;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: var(--color-gray-2);
  padding: var(--spacing-4);
  > *:not(:last-child) {
    margin-bottom: var(--spacing-5);
  }
}
</style>
