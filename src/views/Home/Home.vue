<template>
  <div class="home">
    <div class="content">
      <BaseNavHorizontalPrimary/>
      <div class="main">
        <div class="title">Discover properties for sale <span class="bold">before</span> they hit the open market</div>
        <div class="subtitle">Access 1,829 properties before they’re publicly advertised on REA or Domain</div>
        <router-link to="/register">
          <BaseButton class="button" text="Get started" design="blue"/>
        </router-link>
      </div>
    </div>
    <BaseMap class="map"/>
  </div>
</template>

<script>
import BaseNavHorizontalPrimary from '@/components/BaseNavHorizontalPrimary/BaseNavHorizontalPrimary'
import BaseButton from '@/components/BaseButton/BaseButton'
import BaseMap from '@/components/BaseMap/BaseMap'
export default {
  name: 'home',
  components: {
    BaseNavHorizontalPrimary,
    BaseButton,
    BaseMap
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  > * {
    width: 50%;
  }
}
.content {
  height: 100%;
  padding: var(--spacing-5);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--color-gray-2);
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-width: 600px;
}
.title {
  font-size: 4rem;
  line-height: 1.2;
  margin-bottom: var(--spacing-2);
  .bold {
    font-weight: var(--font-weight-bold);
  }
}
.subtitle {
  color: var(--color-gray-4);
  margin-bottom: var(--spacing-5);
}
.button {
  padding: var(--spacing-2);
}
.map {
  border-left: var(--color-gray-1) solid 1px;
}
</style>
