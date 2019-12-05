<template>
  <div class="how-it-works">
    <div class="container">
      <BaseNavHorizontalPrimary/>
      <BaseDivider/>
      <div class="content">
        <BaseText1 text="How it works"/>
      </div>
    </div>
  </div>
</template>

<script>
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseNavHorizontalPrimary from '@/components/BaseNavHorizontalPrimary/BaseNavHorizontalPrimary'
export default {
  name: 'how-it-works',
  components: {
    BaseNavHorizontalPrimary,
    BaseDivider,
    BaseText1
  }
}
</script>

<style lang="scss" scoped>
.how-it-works {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-5);
}
.container {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.nav {
  margin-bottom: var(--spacing-5);
}
.content {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
}
</style>
